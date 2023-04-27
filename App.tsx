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
import PostItem from './assets/post/PostItem';
import AvatarEntity from './src/common/AvatarEntity';
import PostLoader from './src/lib/PostLoader';
import CommentLoader from './src/lib/CommentLoader';
import Router from './src/components';
// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module 'native-base' {
  interface ICustomTheme extends MyThemeType {}
}

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar />
      <Router />
    </NativeBaseProvider>
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
