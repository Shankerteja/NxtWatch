import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import TrendingSection from './components/TrendingSection'
import GamingSection from './components/GamingSection'
import PlayingVideoSection from './components/PlayingVideoSection'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'
import ComponentWrapper from './components/ComponentWrapper'
import ContextLanguage from './context/ContextLanguage'
import './App.css'

class App extends Component {
  state = {
    savedList: [],
    isDark: false,
    activeTab: 'Home',
  }

  changeNavTab = id => {
    this.setState({activeTab: id})
  }

  getSavedList = savedObject => {
    const {savedList} = this.state

    const savedDetails = savedList.find(
      eachItem => eachItem.id === savedObject.id,
    )
    if (savedDetails === undefined) {
      this.setState(prevState => ({
        savedList: [...prevState.savedList, savedObject],
      }))
    } else {
      const filterData = savedList.filter(
        eachItem => eachItem.id !== savedObject.id,
      )
      this.setState({savedList: filterData})
    }
  }

  toggleTheme = () => {
    this.setState(prevState => ({isDark: !prevState.isDark}))
  }

  render() {
    const {savedList, isDark, activeTab} = this.state
    return (
      <ContextLanguage.Provider
        value={{
          isDark,
          toggleTheme: this.toggleTheme,
          savedList,
          saveTheVideo: this.getSavedList,
          changeTab: this.changeNavTab,
          activeTab,
        }}
      >
        <Switch>
          <ComponentWrapper exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <ComponentWrapper
            exact
            path="/trending"
            component={TrendingSection}
          />
          <ComponentWrapper exact path="/gaming" component={GamingSection} />
          <ComponentWrapper
            exact
            path="/videos/:id"
            component={PlayingVideoSection}
          />
          <ComponentWrapper
            exact
            path="/saved-videos"
            component={SavedVideos}
          />
          <NotFound />
        </Switch>
      </ContextLanguage.Provider>
    )
  }
}

export default App
