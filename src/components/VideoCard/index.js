import {Component} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import './index.css'

import ContextLanguage from '../../context/ContextLanguage'

export const CardTitle = styled.p`
  color: ${props => (props.color ? 'white' : '#1e293b')};
`
export const ChannelName = styled.p`
  color: ${props => (props.color ? '#475569' : '#000')};
  font-weight: ${props => (props.color ? 'bold' : 'normal')};
`
export const ViewStyle = styled.p`
  color: ${props => (props.color ? '#475569' : '#000')};
  font-weight: ${props => (props.color ? 'bold' : 'normal')};
`

class VideoCard extends Component {
  render() {
    const {videoDetails} = this.props
    const {
      title,
      viewCount,
      publishedAt,
      thumbnailUrl,
      channel,
      id,
    } = videoDetails

    return (
      <ContextLanguage.Consumer>
        {value => {
          const {isDark} = value

          return (
            <li className="video-card-container">
              <Link to={`/videos/${id}`} className="link-tag">
                <img
                  src={thumbnailUrl}
                  className="video-thumbail"
                  alt="video thumbnail"
                />
                <div className="video-details-container">
                  <img
                    src={channel.profile_image_url}
                    className="channel-image-lg"
                    alt="channel logo"
                  />
                  <div className="video-title-name">
                    <CardTitle className="title-details" color={isDark}>
                      {title}
                    </CardTitle>
                    <ChannelName className="channel-name" color={isDark}>
                      {channel.name}
                    </ChannelName>
                    <div className="views-container">
                      <ViewStyle className="views-count" color={isDark}>
                        {viewCount}views
                      </ViewStyle>
                      <ViewStyle className="published-date" color={isDark}>
                        {publishedAt}
                      </ViewStyle>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          )
        }}
      </ContextLanguage.Consumer>
    )
  }
}

export default VideoCard
