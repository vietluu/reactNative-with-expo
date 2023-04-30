import { useState } from 'react'
import { Input, Stack, Text, Button, Icon, Pressable, Center, NativeBaseProvider, View, FormControl } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { api } from '../../utils/api'
import { UserSignIn } from '../../types'

const SignIn = ({ navigation }: any) => {
  const [show, setShow] = useState(false)
  const [user, setUser] = useState({ email: '', password: '' })

  const handleSignIn = async () => {
    const payload: UserSignIn = user
    const { data } = await api.post('/auth/local/signup', payload)

    console.log('handleSignIn')
    navigation.navigate('LayoutScreen')
    return true
  }

  const goToSignUp = () => {
    navigation.navigate('SignUp')
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
          placeholder="Password"
        />
      </FormControl>

      <Button w={'full'} onPress={handleSignIn} marginTop={4}>
        Sign in
      </Button>

      <Text onPress={goToSignUp} marginTop={2}>
        Don't have an account?
      </Text>
    </Center>
  )
}

export default SignIn
