import {Link} from 'react-router-dom'
import styled from 'styled-components'
import ContextLanguage from '../../context/ContextLanguage'
import './index.css'

const GameCard = styled.div`
  background-color: ${props => (props.color ? '#000' : 'white')};
`
const GameTitle = styled.p`
  color: ${props => (props.color ? '#ebebeb' : '#212121')};
`
const GameCount = styled.p`
  color: ${props => (props.color ? '#94a3b8' : '#212121')};
`
const GamingVideoItem = props => (
    <ContextLanguage.Consumer>
      {value => {
        const {isDark} = value
        const {gamingDetails} = props
        const {thumbnailUrl, title, id, viewCount} = gamingDetails
        return (
          <Link to={`/videos/${id}`} className="link">
            <GameCard className="gaming-video-card" color={isDark}>
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="game-image"
              />
              <GameTitle className="game-name" color={isDark}>
                {title}
              </GameTitle>
              <GameCount className="gaming-view-count" color={isDark}>
                {viewCount} Watching Worldwide
              </GameCount>
            </GameCard>
          </Link>
        )
      }}
    </ContextLanguage.Consumer>
  )

export default GamingVideoItem
