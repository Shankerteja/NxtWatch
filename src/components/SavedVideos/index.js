import {MdPlaylistAdd} from 'react-icons/md'
import styled from 'styled-components'
import Header from '../Header'
import FilterContainer from '../FilterContainer'
import ContextLanguage from '../../context/ContextLanguage'

import TrendingVideoItem from '../TrendingVideoItem'
import './index.css'

const SavedHeader = styled.div`
  background-color: ${props => (props.color ? '#212121' : '#ebebeb')};
  padding: 20px 10px;
`
const SavedHeading = styled.h1`
  color: ${props => (props.color ? '#ebebeb' : ' #1e293b')};
`
const SavedParentContainer = styled.div`
  background-color: ${props => (props.color ? '#000' : 'white')};
  margin: 0px;
`

const NoSavedContainer = styled.div`
  color: ${props => (props.color ? '#ebebeb' : '#000')};
`
const SavedVideos = () => (
    <ContextLanguage.Consumer>
      {value => {
        const {savedList, isDark} = value
        console.log(savedList)
        return (
          <div className="saved-videos-container">
            <Header />
            <SavedParentContainer
              className="saved-videos-content-container"
              color={isDark}
            >
              <FilterContainer />
              {savedList.length > 0 ? (
                <div className="saved-videos-list-container">
                  <SavedHeader
                    className="saved-header-container"
                    color={isDark}
                  >
                    <span className="saved-icon-bg">
                      <MdPlaylistAdd size={23} color="#ff0000" />
                    </span>
                    <SavedHeading className="saved-name" color={isDark}>
                      Saved Videos
                    </SavedHeading>
                  </SavedHeader>
                  <ul className="saved-videos-list">
                    {savedList.map(eachItem => (
                      <TrendingVideoItem
                        videoDetails={eachItem}
                        key={eachItem.id}
                      />
                    ))}
                  </ul>
                </div>
              ) : (
                <NoSavedContainer
                  className="not-saved-container"
                  color={isDark}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png "
                    alt="no saved videos"
                    className="no-saved-image"
                  />
                  <h1 className="no-saved-heading">No saved videos found</h1>
                  <p className="no-saved-para">
                    You can save your videos while watching them
                  </p>
                </NoSavedContainer>
              )}
            </SavedParentContainer>
          </div>
        )
      }}
    </ContextLanguage.Consumer>
  )

export default SavedVideos
/* */
