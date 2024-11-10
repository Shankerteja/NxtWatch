import {Component} from 'react'

import {FaFire} from 'react-icons/fa'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import styled from 'styled-components'
import './index.css'
import Header from '../Header'
import TrendingVideoItem from '../TrendingVideoItem'
import FilterContainer from '../FilterContainer'
import ContextLanguage from '../../context/ContextLanguage'

export const TrendingSectionColor = styled.div`
  background-color: ${props => (props.color ? '#000' : 'White')};
`
const FailureContainer = styled.div`
  color: ${props => (props.color ? 'white' : '#000')};
`
const TrendHeader = styled.div`
  background-color: ${props => (props.color ? '#212121' : '#ebebeb')};
  padding: 20px 10px;
`
const TrendHeading = styled.h1`
  color: ${props => (props.color ? '#ebebeb' : ' #1e293b')};
`

const LoaderContainer = styled.div`
  background-color: ${props => (props.color ? '#000' : '#fff')};
  height: 100vh;
`
const apiObjectDetilas = {
  initail: 'initail',
  inProgess: 'inProgress',
  success: 'success',
  failure: 'failure',
}
class TrendingSection extends Component {
  state = {
    trendingList: [],
    apiStatus: apiObjectDetilas.initail,
  }

  getTheTrendingVideos = async () => {
    this.setState({apiStatus: apiObjectDetilas.inProgess})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedTrendList = data.videos.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        publishedAt: eachItem.published_at,
        thumbnailUrl: eachItem.thumbnail_url,
        viewCount: eachItem.view_count,
        channel: eachItem.channel,
      }))
      this.setState({
        trendingList: updatedTrendList,
        apiStatus: apiObjectDetilas.success,
      })
    } else {
      this.setState({apiStatus: apiObjectDetilas.failure})
    }
  }

  successViewContainerTrend = () => {
    const {trendingList} = this.state
    return (
      <ContextLanguage.Consumer>
        {value => {
          const {isDark} = value
          return (
            <>
              <TrendHeader className="trending-header" color={isDark}>
                <span className="trend-bg">
                  <FaFire size={20} color="#ff0000" />
                </span>
                <TrendHeading className="trending-heading" color={isDark}>
                  Trending
                </TrendHeading>
              </TrendHeader>
              <ul className="trending-videos-list">
                {trendingList.map(eachItem => (
                  <TrendingVideoItem
                    key={eachItem.id}
                    videoDetails={eachItem}
                  />
                ))}
              </ul>
            </>
          )
        }}
      </ContextLanguage.Consumer>
    )
  }

  getResultContainerTrend = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiObjectDetilas.success:
        return this.successViewContainerTrend()
      case apiObjectDetilas.failure:
        return this.failureViewContainer()
      case apiObjectDetilas.inProgess:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  retryRequest = () => {
    this.getTheTrendingVideos()
  }

  failureViewContainer = () => (
      <ContextLanguage.Consumer>
        {value => {
          const {isDark} = value
          return (
            <FailureContainer className="failure-container" color={isDark}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
                alt="failure "
                className="failure-image"
              />
              <h1 className="failure-heading">!Oops Somthing Went Wrong</h1>
              <p className="failure-para">
                We are have some touble to complete your request. Please try
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

  componentDidMount = () => {
    this.getTheTrendingVideos()
  }

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
      <ContextLanguage.Consumer>
        {value => {
          const {isDark} = value
          return (
            <div data-testid="trending">
              <Header />
              <div className="trending-total-container">
                <FilterContainer />
                <TrendingSectionColor
                  className="tending-section-container"
                  color={isDark}
                >
                  {this.getResultContainerTrend()}
                </TrendingSectionColor>
              </div>
            </div>
          )
        }}
      </ContextLanguage.Consumer>
    )
  }
}

export default TrendingSection
