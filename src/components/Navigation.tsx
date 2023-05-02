import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Layout from './Layout'
import SignIn from '../screens/auth/Signin'
import SignUp from '../screens/auth/Signup'

function BaseLink() {
  const Stack = createNativeStackNavigator()
  const initialRouteName = 'LayoutScreen'

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Group>
          <Stack.Screen
            name="SignInScreen"
            component={SignIn}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUp}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Group>

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
