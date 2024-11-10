import {Link} from 'react-router-dom'
import styled from 'styled-components'
import ContextLanguage from '../../context/ContextLanguage'

import './index.css'

const TrendingBg = styled.li`
  background-color: ${props => (props.color ? '#000' : 'white')};
  width: 100%;
`
const TrendHeading = styled.p`
  color: ${props => (props.color ? '#ebebeb' : '#475569')};
`
const TrendSubDetails = styled.div`
  color: ${props => (props.color ? '#94a3b8' : '#212121')};
`
const TrendingVideoItem = props => {
  const {videoDetails} = props
  const {
    thumbnailUrl,
    title,
    publishedAt,
    id,
    channel,
    viewCount,
  } = videoDetails
  return (
    <ContextLanguage.Consumer>
      {value => {
        const {isDark} = value
        return (
          <Link to={`/videos/${id}`} className="link">
            <TrendingBg className="video-trend-card-container" color={isDark}>
              <img
                src={thumbnailUrl}
                className="trending-image"
                alt="video thumbnail"
              />
              <div className="trending-content-details">
                <img
                  src={channel.profile_image_url}
                  className="channel-image-trend"
                  alt="channel logo"
                />
                <TrendSubDetails className="trending-details" color={isDark}>
                  <TrendHeading className="video-title" color={isDark}>
                    {title}
                  </TrendHeading>
                  <p className="trending-channel-name p ch-sm">
                    {channel.name}
                  </p>
                  <div className="view-count-container">
                    <p className="tend-views-count p">{viewCount} views</p>
                    <p className="video-date p">{publishedAt}</p>
                  </div>
                </TrendSubDetails>
              </div>
            </TrendingBg>
          </Link>
        )
      }}
    </ContextLanguage.Consumer>
  )
}

export default TrendingVideoItem
