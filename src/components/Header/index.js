import {RiMenu2Fill} from 'react-icons/ri'
import {Link,withRouter} from 'react-router-dom'
import {TiHome,TiAdjustContrast,TiAdjustBrightness} from 'react-icons/ti'
import {FaFire} from 'react-icons/fa'
import {MdPlaylistAdd} from 'react-icons/md'
import {SiYoutubegaming} from 'react-icons/si'
import {FiLogOut} from 'react-icons/fi'



import 'reactjs-popup/dist/index.css'
import Cookies from 'js-cookie'

import {ImCross} from 'react-icons/im'
import styled from 'styled-components'
import Popup from 'reactjs-popup'
import ContextLanguage from '../../context/ContextLanguage'
import './index.css'

export const NavColor = styled.div`
  background-color: ${props => (props.color ? '#000' : 'white')};
`
export const FooterHeader = styled.p`
  color: ${props => (props.color ? 'white' : '#181818')};
`
export const FooterPara = styled.p`
  color: ${props => (props.color ? 'white' : '#181818')};
`

const NavItem = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 6px;
  background-color: ${props => (props.color ? '#f1f5f9' : '')};
`
export const LogoutButton = styled.button`
  padding: 10px 18px;
  border-radius: 4px;
  background-color: ${props => (props.outline ? 'white' : '#3b82f6')};
  color: ${props => (props.outline ? 'gray' : 'white')};
  outline: none;
  cursor: pointer;
  font-family: Roboto;
  font-weight: bold;
  margin-right: 15px;
  border-width: ${props => (props.outline ? '1px' : 'none')};
  border-color: ${props => (props.outline ? '#cbd5e1' : 'transparent')};
`

const Header = props => {
  const logoutFunction = () => {
    const {history} = props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }
  return (
    <ContextLanguage.Consumer>
      {value => {
        const {isDark, toggleTheme, activeTab, changeTab} = value
        const changeTheme = () => {
          toggleTheme()
        }
        const theme = isDark ? 'add-color' : null
        const darkLogo = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

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
          <div className={`header-container ${theme}`}>
            <div className="nav-container">
              <Link to="/">
                <img src={darkLogo} alt="website logo" className="logo" />
              </Link>

              <ul className="nav-items-list">
                <li className="nav-item-sm">
                  <button
                    type="button"
                    className="dark-icon"
                    onClick={changeTheme}
                    data-testid="theme"
                  >
                    {isDark ? (
                      <TiAdjustBrightness size={22} color="#fff" />
                    ) : (
                      <TiAdjustContrast size={22} color="#000" />
                    )}
                  </button>
                </li>
                <li className="nav-item-sm">
                  <Popup
                    modal
                    trigger={
                      <RiMenu2Fill size={22} color={isDark ? '#fff' : '#000'} />
                    }
                  >
                    {close => (
                      <div className="popup-content-menu">
                        <div className="menu-content">
                          <ul className="categoy-items-container">
                            <Link to="/" className="link">
                              <NavItem
                                className="categoy-item"
                                onClick={homenavClicked}
                                color={activeTab === 'Home'}
                              >
                                <TiHome
                                  size={30}
                                  color={
                                    activeTab === 'Home' ? 'red' : '#475569'
                                  }
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
                                  color={
                                    activeTab === 'Trending' ? 'red' : '#475569'
                                  }
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
                                  color={
                                    activeTab === 'Gaming' ? 'red' : '#475569'
                                  }
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
                                  color={
                                    activeTab === 'Saved' ? 'red' : '#475569'
                                  }
                                />
                                <p className="categoy-name">Saved videos</p>
                              </NavItem>
                            </Link>
                          </ul>
                        </div>
                        <button
                          type="button"
                          className="trigger-button menu-cross"
                          onClick={() => close()}
                        >
                          <ImCross />
                        </button>
                      </div>
                    )}
                  </Popup>
                </li>
                <li className="nav-item-sm">
                  <Popup
                    modal
                    trigger={
                      <FiLogOut size={22} color={isDark ? '#fff' : '#000'} />
                    }
                    className="popup-content"
                  >
                    {close => (
                      <div className="logout-card">
                        <p className="logout-heading">
                          Are you sure, you want to logout ?
                        </p>
                        <div className="logout-buttons">
                          <LogoutButton outline onClick={() => close()}>
                            Cancel
                          </LogoutButton>
                          <LogoutButton onClick={logoutFunction}>
                            Confirm
                          </LogoutButton>
                        </div>
                      </div>
                    )}
                  </Popup>
                </li>
              </ul>

              <div className="nav-items-lg">
                <button className="theme-image-lg" onClick={changeTheme}>
                  {isDark ? (
                    <TiAdjustBrightness className="theme-icon" color="#fff" />
                  ) : (
                    <TiAdjustContrast className="theme-icon" />
                  )}
                </button>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png "
                  alt="profile"
                  className="profile-image"
                />

                <Popup
                  modal
                  trigger={<button className="logout-button-lg">Logout</button>}
                  className="popup-content"
                >
                  {close => (
                    <div className="logout-card">
                      <p className="logout-heading">
                        Are you sure, you want to logout ?
                      </p>
                      <div className="logout-buttons">
                        <LogoutButton outline onClick={() => close()}>
                          Cancel
                        </LogoutButton>
                        <LogoutButton onClick={logoutFunction}>
                          Confirm
                        </LogoutButton>
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
            </div>
          </div>
        )
      }}
    </ContextLanguage.Consumer>
  )
}

export default withRouter(Header)
