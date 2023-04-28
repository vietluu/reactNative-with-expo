import React, { useCallback, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Layout from './layout';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';

//SplashScreen.preventAutoHideAsync();

function BaseLink() {
  // const [appIsReady,setAppIsReady] = useState(false)
  // useEffect(() => {
  //     async function prepare() {
  //       try {
  //         await new Promise(resolve => setTimeout(resolve, 2000));
  //       } catch (e) {
  //         console.warn(e);
  //       } finally {
  //         // Tell the application to render
  //         setAppIsReady(true);
  //       }
  //     }

  //     prepare();
  // }, []);
  // const onLayoutRootView = useCallback(async () => {
  //     if (appIsReady) {
  //       await SplashScreen.hideAsync();
  //     }
  //   }, [appIsReady]);

  //   if (!appIsReady) {
  //     return null;
  //   }
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="layout"
          component={Layout}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default BaseLink;
