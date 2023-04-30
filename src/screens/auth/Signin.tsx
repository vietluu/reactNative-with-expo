import { useState } from 'react'
import { api } from '../../utils/api'
import { UserSignIn } from '../../types'
import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MaterialIcons } from '@expo/vector-icons'
import { Input, Text, Button, Icon, Pressable, Center, FormControl } from 'native-base'

const SignIn = ({ navigation }: any) => {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({ email: '', password: '' })

  const handleSignIn = async () => {
    if (user.email === '' || user.password === '') return

    setLoading(true)
    const payload: UserSignIn = user

    try {
      const { data } = await api.post('/auth/local/signin', JSON.parse(JSON.stringify(payload)))
      const { access_token } = data

      if (Platform.OS === 'web') {
        // do something for ios
        localStorage.setItem('access_token', access_token)
      } else if (Platform.OS === 'android') {
        // other thing for android
        await AsyncStorage.setItem('access_token', access_token)
      }

      console.log('sign in success', data)
      if (!data || !data.access_token) return
      navigation.navigate('LayoutScreen')
    } catch (error) {
      console.error('handleSignIn', error)
    }

    setLoading(false)
  }

  const goToSignUp = () => {
    navigation.navigate('SignUpScreen')
  }

  return (
    <Center _dark={{ bg: 'blueGray.900' }} _light={{ bg: 'blueGray.50' }} px={4} flex={1}>
      <Text fontSize={'xl'} fontWeight={'medium'}>
        SignIn
      </Text>

      <FormControl>
        {/* Email Input */}
        <Input
          marginTop={4}
          InputLeftElement={<Icon as={<MaterialIcons name="email" />} size={5} ml="2" color="muted.400" />}
          onChangeText={(text) => setUser({ ...user, email: text })}
          defaultValue={user.email}
          placeholder="Email"
        />

        {/* Password Input */}
        <Input
          marginTop={4}
          type={show ? 'text' : 'password'}
          InputRightElement={
            <Pressable onPress={() => setShow(!show)}>
              <Icon
                as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'} />}
                size={5}
                mr="2"
                color="muted.400"
              />
            </Pressable>
          }
          onChangeText={(text) => setUser({ ...user, password: text })}
          defaultValue={user.password}
          placeholder="Password"
        />
      </FormControl>

      <Button w={'full'} onPress={handleSignIn} marginTop={4} isLoading={loading} isLoadingText="Signing in">
        Sign in
      </Button>

      <Text onPress={goToSignUp} marginTop={2}>
        Don't have an account?
      </Text>
    </Center>
  )
}

export default SignIn
