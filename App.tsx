import { Provider } from 'react-redux'
import { NativeBaseProvider, extendTheme, StatusBar } from 'native-base'
import Navigation from './src/components/Navigation'
import store from './src/redux'

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
}

// extend the theme
export const theme = extendTheme({ config })
type MyThemeType = typeof theme
declare module 'native-base' {
  type ICustomTheme = MyThemeType
}

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <StatusBar />
        <Navigation />
      </NativeBaseProvider>
    </Provider>
  )
}
