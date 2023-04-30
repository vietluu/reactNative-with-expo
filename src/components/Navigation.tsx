import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Layout from './Layout'
import { NavigationContainer } from '@react-navigation/native'
import Signin from '../screens/auth/Signin'
import { StyleSheet } from 'react-native'
import Signup from '../screens/auth/Signup'

function BaseLink() {
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="SignInScreen" component={Signin} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpScreen" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen
          name="LayoutScreen"
          component={Layout}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default BaseLink
