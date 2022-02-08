/* File principale dell'applicazione; qui vengono:
   - inizializzati tutti i pacchetti necessari,
   - stabilita la connessione con il database locale
   - caricati i font per l'applicazione
   - inizializzato il Main Navigator tramite il quale viene gestita tutta l'app
*/

import { LogBox } from 'react-native' 
LogBox.ignoreLogs(['Setting a timer for a long period of time']) // to avoid "Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android" warning

import React from 'react'
import CustomStatusBar from './components/UI/StatusBar'
import AppBootstrap from './components/UI/AppBootstrap'
import MainNavigator from './navigation/MainNavigator'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import themeReducer from './store/reducers/theme'
import authReducer from './store/reducers/auth'
import productsReducer from './store/reducers/products'

import { enableScreens } from 'react-native-screens'
import { init, destroy } from './helpers/db'


enableScreens()

// destroy()
init()
  .then(() => {
    console.log('Initialized database')
  }).catch(err => {
    console.log('Initializing db failed.')
    console.log(err)
  })

const rootReducer = combineReducers({
  mode: themeReducer,
  auth: authReducer,
  products: productsReducer
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