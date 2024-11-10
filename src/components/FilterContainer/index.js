import {Link} from 'react-router-dom'
import {TiHome} from 'react-icons/ti'

import styled from 'styled-components'
import {FaFire} from 'react-icons/fa'
import {MdPlaylistAdd} from 'react-icons/md'
import {SiYoutubegaming} from 'react-icons/si'

import ContextLanguage from '../../context/ContextLanguage'
import './index.css'

export const NavColor = styled.div`
  background-color: ${props => (props.color ? '#000' : 'white')};
`
export const FooterHeader = styled.p`
  color: ${props => (props.color ? 'white' : '#181818')};
  font-size: 20px;
  font-weight: bold;
`
export const FooterPara = styled.p`
  color: ${props => (props.color ? 'white' : '#181818')};
`

const NavItem = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 6px;
  background-color: ${props => (props.color ? '#e2e8f0' : '')};
`
const FilterContainer = () => (
    <ContextLanguage.Consumer>
      {value => {
        const {isDark, activeTab, changeTab} = value
        const homenavClicked = () => {
          changeTab('Home')
        }
        const savedNavClicked = () => {
          changeTab('Saved')
        }
        const gameNavClicked = () => {
          changeTab('Gaming')
        }
        const trendNavClicked = () => {
          changeTab('Trending')
        }

        return (
          <NavColor className="categoy-container" color={isDark}>
            <ul className="categoy-items-container">
              <Link to="/" className="link">
                <NavItem
                  className="categoy-item"
                  onClick={homenavClicked}
                  color={activeTab === 'Home'}
                >
                  <TiHome
                    size={30}
                    color={activeTab === 'Home' ? 'red' : 'gray'}
                  />
                  <p className="categoy-name">Home</p>
                </NavItem>
              </Link>
              <Link to="/trending" className="link">
                <NavItem
                  className="categoy-item"
                  onClick={trendNavClicked}
                  color={activeTab === 'Trending'}
                >
                  <FaFire
                    size={30}
                    color={activeTab === 'Trending' ? 'red' : 'gray'}
                  />
                  <p className="categoy-name">Trending</p>
                </NavItem>
              </Link>
              <Link to="/gaming" className="link">
                <NavItem
                  className="categoy-item"
                  onClick={gameNavClicked}
                  color={activeTab === 'Gaming'}
                >
                  <SiYoutubegaming
                    size={30}
                    color={activeTab === 'Gaming' ? 'red' : 'gray'}
                  />
                  <p className="categoy-name">Gaming</p>
                </NavItem>
              </Link>
              <Link to="/saved-videos" className="link">
                <NavItem
                  className="categoy-item"
                  onClick={savedNavClicked}
                  color={activeTab === 'Saved'}
                >
                  <MdPlaylistAdd
                    size={30}
                    color={activeTab === 'Saved' ? 'red' : 'gray'}
                  />
                  <p className="categoy-name">Saved videos</p>
                </NavItem>
              </Link>
            </ul>
            <div className="footer-container">
              <FooterHeader className="footer-heading" color={isDark}>
                CONTACT US
              </FooterHeader>
              <div className="follow-images">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                  className="follow-image"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                  className="follow-image"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
                  alt="twitter logo"
                  className="follow-image"
                />
              </div>
              <FooterPara className="footer-content" color={isDark}>
                Enjoy! Now to see your channels and recommendations!
              </FooterPara>
            </div>
          </NavColor>
        )
      }}
    </ContextLanguage.Consumer>
  )
export default FilterContainer
