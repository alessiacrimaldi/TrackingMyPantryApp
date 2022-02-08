/* Componente per il caricamento dei font per l'applicazione */

import React, { useState } from 'react'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'


const fetchFonts = () => {
  return Font.loadAsync({
    'poppins-semibold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    'open-sans': require('../../assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('../../assets/fonts/OpenSans-Bold.ttf')
  })
}

const AppBootstrap = ({ children }) => {
  const [fontLoaded, setFontLoaded] = useState(false)

  return fontLoaded
    ?
    <>{children}</>
    :
    <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontLoaded(true)}
      onError={(err) => console.log(err)}
    />
}

export default AppBootstrap