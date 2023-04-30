import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Layout from './Layout'
import SignIn from '../screens/auth/SignIn'
import SignUp from '../screens/auth/SignUp'

function BaseLink() {
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="SignInScreen" component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpScreen" component={SignUp} options={{ headerShown: false }} />
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
