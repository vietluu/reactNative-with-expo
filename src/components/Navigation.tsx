import { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import { useAppDispatch } from '../redux'
import Layout from './Layout'
import SignIn from '../screens/auth/Signin'
import SignUp from '../screens/auth/Signup'
import { getToken } from '../utils'
import { Spinner } from 'native-base'

function BaseLink() {
  const Stack = createNativeStackNavigator()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [initRoute, setInitRoute] = useState('SignIn')

  useLayoutEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const token = await getToken()
        if (token !== null) await setInitRoute('LayoutScreen')
      } catch (error) {
        console.error('NavigationContainer: ', error)
      }
      setLoading(false)
      // ** action check token
    })()
  }, [])

  return (
    <NavigationContainer>
      {loading ? (
        <Spinner />
      ) : (
        <Stack.Navigator initialRouteName={initRoute}>
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
      )}
    </NavigationContainer>
  )
}

export default BaseLink
