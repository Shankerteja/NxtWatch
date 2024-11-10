import {Component} from 'react'
import ReactPlayer from 'react-player'
import './index.css'
import Cookies from 'js-cookie'
import {AiOutlineLike} from 'react-icons/ai'
import {BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
import styled from 'styled-components'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FilterCointer from '../FilterContainer'
import ContextLanguage from '../../context/ContextLanguage'

export const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 14px;
  color: ${props => props.color};
  cursor: pointer;
`
export const LikeText = styled.button`
  font-family: Roboto;
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.color};
  margin-left: 3px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`
export const ChannelContainer = styled.div`
  display: flex;
  align-items: center;
`
export const Image = styled.img`
  height: 50px;
  width: 50px;
  margin-right: 15px;
`
export const ChannelNameContainer = styled.div`
  display: flex;
  flex-direction: column;
`
export const ChannelName = styled.p`
  font-family: Roboto;
  font-size: 14px;
  color: ${props => (props.color ? '#ebebeb' : '#000')};
`
export const ChannelSub = styled.p`
  font-family: Roboto;
  font-size: 12px;
  margin: 0px;
  color: ${props => (props.color ? '#475569' : 'gray')};
`
export const Description = styled.p`
  font-fammily: Roboto;
  font-size: 13px;
  font-weight: 500;
  color: ${props => (props.color ? '#ebebeb' : '#64748b')};
`
export const LoaderContainer = styled.div`
  height: 90vh;
  display: flex;
  width: 100%;
  background-color: ${props => (props.color ? '#000' : '#fff')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const apiObjectDetilas = {
  initail: 'initail',
  inProgess: 'inProgress',
  success: 'success',
  failure: 'failure',
}
export const PlayingVideoPart = styled.div`
  background-color: ${props => (props.color ? '#000' : 'white')};
  overflow: auto;
  height: 90vh;
`
export const VideoSecctionTitle = styled.p`
  color: ${props => (props.color ? 'white' : '#000')};
`
export const FailureContent = styled.div`
  background-color: ${props => (props.color ? '#000' : 'white')};
`
export const PlayindVideoCount = styled.div`
  color: ${props => (props.color ? '#475569' : 'gray')};
  font-size: 18px;
  font-weight: bold;
`
class PlayingVideoSection extends Component {
  state = {
    videoDetails: {},
    loading: false,
    videoDetailsApi: apiObjectDetilas.initail,
    like: false,
    dislike: false,
  }

  getDetailsOfVideo = async () => {
    this.setState({videoDetailsApi: apiObjectDetilas.inProgess})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const videoObject = data.video_details
      const updatedObject = {
        id: videoObject.id,
        title: videoObject.title,
        thumbnailUrl: videoObject.thumbnail_url,
        viewCount: videoObject.view_count,
        videoUrl: videoObject.video_url,
        channel: videoObject.channel,
        publishedAt: videoObject.published_at,
        description: videoObject.description,
      }
      this.setState({
        videoDetails: updatedObject,
        videoDetailsApi: apiObjectDetilas.success,
      })
    } else {
      this.setState({videoDetailsApi: apiObjectDetilas.failure})
    }
  }

  renderLoaderView = () => (
      <ContextLanguage.Consumer>
        {value => {
          const {isDark} = value
          return (
            <LoaderContainer data-testid="loader" color={isDark}>
              <Loader
                type="Oval"
                height={50}
                widht={50}
                color={isDark ? '#fff' : '#000'}
              />
            </LoaderContainer>
          )
        }}
      </ContextLanguage.Consumer>
    )

  retryRequest = () => {
    this.getDetailsOfVideo()
  }

  renderFailureView = () => (
      <ContextLanguage.Consumer>
        {value => {
          const {isDark} = value

          return (
            <FailureContent className="failure-container" color={isDark}>
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
            </FailureContent>
          )
        }}
      </ContextLanguage.Consumer>
    )

  addLike = () => {
    this.setState(prevState => ({like: !prevState.like, dislike: false}))
  }

  disLike = () => {
    this.setState(prevState => ({dislike: !prevState.dislike, like: false}))
  }

  renderVideodetailsView = () => (
      <ContextLanguage.Consumer>
        {value => {
          const {saveTheVideo, savedList, isDark} = value
          const {videoDetails, like, dislike} = this.state
          const {
            title,
            viewCount,
            id,
            description,
            publishedAt,
            channel,
            videoUrl,
          } = videoDetails
          const videoExist = savedList.findIndex(eachItem => eachItem.id === id)
          let saved
          if (videoExist === -1) {
            saved = false
          } else {
            saved = true
          }
          const saveVideo = () => {
            saveTheVideo(videoDetails)
          }

          const stylecolor = saved ? '#2563eb' : '#64748b'

          return (
            <PlayingVideoPart className="video-player-container" color={isDark}>
              <ReactPlayer
                url={videoUrl}
                width="100%"
                height="60vh"
                className="react-video"
                controls
              />
              <div className="video-name-container">
                <VideoSecctionTitle
                  className="video-playing-title"
                  color={isDark}
                >
                  {title}
                </VideoSecctionTitle>
                <div className="video-comments-container">
                  <div className="desktop">
                    <PlayindVideoCount
                      className="video-view-count"
                      color={isDark}
                    >
                      <p className="video-paly-count">{viewCount}</p>
                      <p className="video-date">{publishedAt}</p>
                    </PlayindVideoCount>
                    <div className="likes-container">
                      <LikeContainer
                        color={like ? '#2563eb' : '#64748b'}
                        onClick={this.addLike}
                      >
                        <AiOutlineLike size={20} />
                        <LikeText color={like ? '#2563eb' : '#64748b'}>
                          Like
                        </LikeText>
                      </LikeContainer>
                      <LikeContainer onClick={this.disLike}>
                        <BiDislike
                          size={20}
                          onClick={this.disLike}
                          color={dislike ? '#2563eb' : '#64748b'}
                        />
                        <LikeText color={dislike ? '#2563eb' : '#64748b'}>
                          Dislike
                        </LikeText>
                      </LikeContainer>
                      <LikeContainer onClick={saveVideo}>
                        <MdPlaylistAdd size={20} color={stylecolor} />
                        <LikeText color={stylecolor}>
                          {saved ? 'Saved' : 'Save'}
                        </LikeText>
                      </LikeContainer>
                    </div>
                  </div>

                  <hr />
                  <ChannelContainer>
                    <Image src={channel.profile_image_url} alt="channel logo" />
                    <ChannelNameContainer>
                      <ChannelName color={isDark}>{channel.name}</ChannelName>
                      <ChannelSub color={isDark}>
                        {channel.subscriber_count} subscribers
                      </ChannelSub>
                    </ChannelNameContainer>
                  </ChannelContainer>
                  <Description color={isDark}>{description}</Description>
                </div>
              </div>
            </PlayingVideoPart>
          )
        }}
      </ContextLanguage.Consumer>
    )

  getVideoItemDetailsResult = () => {
    const {videoDetailsApi} = this.state
    switch (videoDetailsApi) {
      case apiObjectDetilas.success:
        return this.renderVideodetailsView()
      case apiObjectDetilas.failure:
        return this.renderFailureView()
      case apiObjectDetilas.inProgess:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  componentDidMount = () => {
    this.getDetailsOfVideo()
  }

  render() {
    return (
      <ContextLanguage.Consumer>
        {value => (
            <div className="playing-video-container">
              <Header />
              <div className="playing-video-content">
                <FilterCointer />
                {this.getVideoItemDetailsResult()}
              </div>
            </div>
          )}
      </ContextLanguage.Consumer>
    )
  }
}

export default PlayingVideoSection
