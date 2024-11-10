import styled from 'styled-components'
import './index.css'
import Header from '../Header'
import FilterContainer from '../FilterContainer'
import ContextLanguage from '../../context/ContextLanguage'

const NotFoundSection = styled.div`
  color: ${props => (props.color ? 'white' : '#000')};
  background-color: ${props => (props.color ? '#000' : '#fff')};
`
const NotFound = () => (
  <ContextLanguage.Consumer>
    {value => {
      const {isDark} = value
      return (
        <div className="Notfound-container">
          <Header />
          <div className="lg-container">
            <FilterContainer />
            <NotFoundSection
              className="notfound-details-container"
              color={isDark}
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
                alt="not found"
                className="notfound-image"
              />
              <h1 className="notfound-heading">Page Not Found</h1>
              <p className="notfound-para">
                we are sorry, the page you requested could not be found.
              </p>
            </NotFoundSection>
          </div>
        </div>
      )
    }}
  </ContextLanguage.Consumer>
)

export default NotFound
