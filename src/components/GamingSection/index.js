import {Component} from 'react'
import styled from 'styled-components'
import {SiYoutubegaming} from 'react-icons/si'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'
import FilterContainer from '../FilterContainer'
import GamingVideoItem from '../GamingVideoItem'
import ContextLanguage from '../../context/ContextLanguage'

const apiObjectDetilas = {
  initail: 'initail',
  inProgess: 'inProgress',
  success: 'success',
  failure: 'failure',
}
const LoaderContainer = styled.div`
  background-color: ${props => (props.color ? '#000' : '#fff')};
  height: 100vh;
`
const GameSectionBg = styled.div`
  background-color: ${props => (props.color ? '#212121' : '#ebebeb')};
  padding: 20px 10px;
`
const FailureContainer = styled.div`
  color: ${props => (props.color ? 'white' : '#000')};
  background-color: ${props => (props.color ? '#000' : 'white')};
`
const GameParentContainer = styled.ul`
  background-color: ${props => (props.color ? '#000' : 'white')};
`
const GameHeading = styled.h1`
  color: ${props => (props.color ? '#ebebeb' : ' #1e293b')};
`
class GamingSection extends Component {
  state = {
    gamingVideosList: [],
    apiStatus: apiObjectDetilas.initail,
  }

  getTheGamingVideosList = async () => {
    this.setState({apiStatus: apiObjectDetilas.inProgess})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedGamingList = data.videos.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        viewCount: eachItem.view_count,
        thumbnailUrl: eachItem.thumbnail_url,
      }))
      this.setState({
        gamingVideosList: updatedGamingList,
        apiStatus: apiObjectDetilas.success,
      })
    } else {
      this.setState({apiStatus: apiObjectDetilas.failure})
    }
  }

  successViewContainer = () => {
    const {gamingVideosList} = this.state
    return (
      <ContextLanguage.Consumer>
        {value => {
          const {isDark} = value
          return (
            <>
              <GameSectionBg className="section-heading" color={isDark}>
                <span className="game-icon-bg">
                  <SiYoutubegaming size={25} color="#ff0000" />
                </span>
                <GameHeading className="gaming-heading" color={isDark}>
                  Gaming
                </GameHeading>
              </GameSectionBg>

              <GameParentContainer
                className="gaming-videos-list"
                color={isDark}
              >
                {gamingVideosList.map(eachItem => (
                  <GamingVideoItem gamingDetails={eachItem} key={eachItem.id} />
                ))}
              </GameParentContainer>
            </>
          )
        }}
      </ContextLanguage.Consumer>
    )
  }

  componentDidMount = () => {
    this.getTheGamingVideosList()
  }

  getResultCOntainer = () => {
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

  failureViewContainer = () => (
      <ContextLanguage.Consumer>
        {value => {
          const {isDark} = value
          return (
            <FailureContainer className="failure-container" color={isDark}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
                alt="failure"
                className="failure-image"
              />
              <h1 className="failure-heading">!Oops Somthing Went Wrong</h1>
              <p className="failure-para">
                We are have some touble to complete your request. Please try
                again.
              </p>
              <button className="failure-button" onClick={this.retryRequest}>
                Retry
              </button>
            </FailureContainer>
          )
        }}
      </ContextLanguage.Consumer>
    )

  renderLoaderView = () => (
    <ContextLanguage.Consumer>
      {value => {
        const {isDark} = value
        return (
          <LoaderContainer
            className="loading-container"
            data-testid="loader"
            color={isDark}
          >
            <Loader
              type="ThreeDots"
              height={50}
              width={50}
              color={isDark ? '#fff' : '#000'}
            />
          </LoaderContainer>
        )
      }}
    </ContextLanguage.Consumer>
  )

  render() {
    return (
      <div className="gaming-section-container">
        <Header />
        <div className="gaming-content-container">
          <FilterContainer />
          <div className="gaming-cards-container">
            {this.getResultCOntainer()}
          </div>
        </div>
      </div>
    )
  }
}
export default GamingSection
