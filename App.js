/* to avoid "Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android" warning */
import { LogBox } from 'react-native'
LogBox.ignoreLogs(['Setting a timer for a long period of time'])

import React from 'react'
import CustomStatusBar from './components/UI/StatusBar'
import AppBootstrap from './components/UI/AppBootstrap'
import MainNavigator from './navigation/MainNavigator'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import authReducer from './store/reducers/auth'
import themeReducer from './store/reducers/theme'

import { enableScreens } from 'react-native-screens'
// import { init } from './helpers/db'


enableScreens()

// init()
//   .then(() => {
//     console.log('Initialized database')
//   }).catch(err => {
//     console.log('Initializing db failed.')
//     console.log(err)
//   })

const rootReducer = combineReducers({
  auth: authReducer,
  mode: themeReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
      <AppBootstrap>
        <CustomStatusBar />
        <MainNavigator />
      </AppBootstrap>
    </Provider>
  )
}