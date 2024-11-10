import {Component} from 'react'

import {ImCross} from 'react-icons/im'
import styled from 'styled-components'
import {IoIosSearch} from 'react-icons/io'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import FilterContainer from '../FilterContainer'
import VideoCard from '../VideoCard'
import './index.css'
import ContextLanguage from '../../context/ContextLanguage'

const BannerContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  height: 300px;
  width: 100%;
  margin-right: auto;
  padding: 20px;
`
export const DeleteAdd = styled.div`
  display: flex;
  justify-content: space-between;
`
export const HomeContainer = styled.div`
  display: flex;
  background-color: ${props => props.color};
`

export const SearchContainer = styled.div`
  border: ${props => (props.color ? '2px' : '1px')} solid
    ${props => (props.color ? '#606060' : '#000')};
`

export const SearchInput = styled.input`
  background-color: ${props => (props.color ? '#000' : '#fff')};
  color: ${props => (props.color ? '#fff' : '#000')};
`

export const SearchButton = styled.button`
  background-color: ${props => (props.color ? '#606060' : 'white')};
`
const FailureContainer = styled.div`
  color: ${props => (props.color ? 'white' : '#000')};
`
const NoResultContainer = styled.div`
  color: ${props => (props.color ? 'white' : '#000')};
`
const apiObjectDetilas = {
  initail: 'initail',
  inProgess: 'inProgress',
  success: 'success',
  failure: 'failure',
}
class Home extends Component {
  state = {
    videosList: [],
    apiStatus: apiObjectDetilas.initail,
    showCards: false,
    searchInput: '',
    showAdd: true,
  }

  renderLoaderView = () => (
    <div className="loading-container" data-testid="loader">
      <Loader type="ThreeDots" height={50} width={50} color="#000000" />
    </div>
  )

  getallVideos = async () => {
    this.setState({apiStatus: apiObjectDetilas.inProgess})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.videos.map(eachItem => ({
        channel: eachItem.channel,
        id: eachItem.id,
        publishedAt: eachItem.published_at,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
      }))
      this.setState({
        videosList: updatedData,
        apiStatus: apiObjectDetilas.success,
      })
    } else {
      this.setState({apiStatus: apiObjectDetilas.failure})
    }
  }

  successViewContainer = () => {
    const {videosList} = this.state
    const searchValue = videosList.length > 0
    return (
      <>
        {searchValue ? (
          <ul className="videos-card-container">
            {videosList.map(eachItem => (
              <VideoCard key={eachItem.id} videoDetails={eachItem} />
            ))}
          </ul>
        ) : (
          this.noSearchValuesFound()
        )}
      </>
    )
  }

  componentDidMount = () => {
    this.getallVideos()
  }

  getResultContainer = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiObjectDetilas.success:
        return this.successViewContainer()
      case apiObjectDetilas.failure:
        return this.failureViewContainer()
      case apiObjectDetilas.inProgess:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  retryRequest = () => {
    this.getallVideos()
  }

  getSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  failureViewContainer = () => (
    <ContextLanguage.Consumer>
      {value => {
        const {isDark} = value
        return (
          <FailureContainer className="failure-container" color={isDark}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
              alt="failure view"
              className="failure-image"
            />
            <h1 className="failure-heading">Oops! Something Went Wrong</h1>
            <p className="failure-para">
              We are having some trouble to complete your request. Please try
              again.
            </p>
            <button
              className="failure-button"
              onClick={this.retryRequest}
              type="button"
            >
              Retry
            </button>
          </FailureContainer>
        )
      }}
    </ContextLanguage.Consumer>
  )

  noSearchValuesFound = () => (
    <ContextLanguage.Consumer>
      {value => {
        const {isDark} = value
        return (
          <NoResultContainer className="novalue-container" color={isDark}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
              className="novlaue-image"
            />
            <h1 className="novalue-heading">No Search Results Found</h1>
            <p className="novalue-para">
              Try different key words or remove search filter
            </p>
            <button
              className="novalue-button"
              onClick={this.retryRequest}
              type="button"
            >
              Retry
            </button>
          </NoResultContainer>
        )
      }}
    </ContextLanguage.Consumer>
  )

  removeAdd = () => {
    this.setState(prevState => ({showAdd: !prevState.showAdd}))
  }

  toggleAdd = () => (
    <BannerContainer data-testid="banner">
      <DeleteAdd>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
          className="add-logo"
        />
        <button
          className="cross-button"
          type="button"
          data-testid="close"
          onClick={this.removeAdd}
        >
          <ImCross />
        </button>
      </DeleteAdd>

      <p className="add-para">Buy Nxt Watch Premium</p>
      <button className="add-button" type="button">
        GET IT NOW{' '}
      </button>
    </BannerContainer>
  )

  getSearchResult = () => {
    const {searchInput} = this.state
    this.setState({searchInput}, this.getallVideos)
  }

  render() {
    const {showAdd} = this.state
    return (
      <ContextLanguage.Consumer>
        {value => {
          const {isDark} = value
          return (
            <>
              <Header />
              <HomeContainer data-testid="home" color={isDark ? '#181818' : ''}>
                <FilterContainer />
                <div className="content-container">
                  {showAdd && this.toggleAdd()}
                  <div className="content-videos-container">
                    <SearchContainer
                      className="search-container"
                      color={isDark}
                    >
                      <SearchInput
                        color={isDark}
                        type="search"
                        className="search-input"
                        placeholder="search"
                        onChange={this.getSearchInput}
                      />
                      <SearchButton
                        color={isDark}
                        className="search-icon"
                        onClick={this.getSearchResult}
                        data-testid="searchButton"
                        type="button"
                      >
                        <IoIosSearch
                          color={isDark ? '#313131' : 'black'}
                          size={22}
                        />
                      </SearchButton>
                    </SearchContainer>
                  </div>
                  <div className="videos-content-container">
                    {this.getResultContainer()}
                  </div>
                </div>
              </HomeContainer>
            </>
          )
        }}
      </ContextLanguage.Consumer>
    )
  }
}
export default Home
