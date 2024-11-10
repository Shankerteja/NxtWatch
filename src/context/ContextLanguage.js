import React from 'react'

const ContextLanguage = React.createContext({
  isDark: true,
  toggleTheme: () => {},
  savedList: [],
  saveTheVideo: () => {},
  changeTab: () => {},
  activeTab: 'Home',
})

export default ContextLanguage
