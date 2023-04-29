import React from 'react';
import {
  Text,
  HStack,
  Center,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  Skeleton,
  StatusBar,
} from 'native-base';
import NativeBaseIcon from './src/lib/NativeBaseIcon';
import PostItem from './src/screens/home/PostItem';
import AvatarEntity from './src/components/common/AvatarEntity';
import PostLoader from './src/components/post/PostLoader';
import CommentLoader from './src/components/CommentLoader';
import Navigation from './src/components/Navigation';
import Login from './src/components/auth/Login';
import Register from './src/components/auth/Register';
import { Provider } from 'react-redux';

import store from './src/redux';
// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
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
  );
}

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === 'light'}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === 'light' ? 'switch to dark mode' : 'switch to light mode'
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}
