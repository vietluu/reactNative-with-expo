import { useState } from 'react'
import { Input, Text, Button, Icon, Pressable, Center, NativeBaseProvider, View, FormControl } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { api } from '../../utils/api'
import { UserSignUp } from '../../types'

const SignUp = ({ navigation }: any) => {
  const [show, setShow] = useState(false)
  const [user, setUser] = useState({ email: '', password: '' })

  const handleSignUp = async () => {
    const payload: UserSignUp = user

    try {
      const { data } = await api.post('/auth/local/signup', payload)

      if (!data || !data.access_token) return

      navigation.navigate('SignInScreen')
    } catch (error) {
      console.error('handleSignUp', error)
    }
  }

  const goToSignIn = () => {
    navigation.navigate('SignInScreen')
  }

  return (
    <Center _dark={{ bg: 'blueGray.900' }} _light={{ bg: 'blueGray.50' }} px={4} flex={1}>
      <Text fontSize={'xl'} fontWeight={'medium'}>
        SignUp
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

        {/* PassWord Input */}
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

        {/* Confirm PassWord Input */}
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
          placeholder="Password"
        />
      </FormControl>

      <Button w={'full'} onPress={handleSignUp} marginTop={4}>
        SignUp
      </Button>

      <Text onPress={goToSignIn} marginTop={2}>
        Already have an account?
      </Text>
    </Center>
  )
}

export default SignUp
