import { useState } from 'react'
import { api } from '../../utils/api'
import { setToken } from '../../utils/token'
import { ThunkDispatch } from 'redux-thunk'
import { UserSignIn } from '../../types'
import { MaterialIcons } from '@expo/vector-icons'
import { Input, Text, Button, Icon, Pressable, Center, FormControl } from 'native-base'
import { haserr, isloading, login } from '../../redux/auth/reducer'
import { useAppDispatch, useAppSelector } from '../../redux'
const SignIn = ({ navigation }: any) => {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({ email: '', password: '' })

  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(isloading)

  const handleSignIn = async () => {
    if (user.email.trim() === '' || user.password.trim() === '') return
    const payload: UserSignIn = user
    try {
      const res: any = await dispatch(login(payload))
      if (!res) return
      console.log('sign in success')
      await setToken(res.payload.access_token)
      navigation.navigate('LayoutScreen')
    } catch (error) {
      console.error('handleSignIn', error)
    }
  }

  const goToSignUp = () => {
    navigation.navigate('SignUpScreen')
  }

  return (
    <Center _dark={{ bg: 'blueGray.900' }} _light={{ bg: 'blueGray.50' }} px={4} flex={1}>
      <Text fontSize={'xl'} fontWeight={'medium'}>
        Sign In
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

      <Button w={'full'} onPress={handleSignIn} marginTop={4} isLoading={isLoading || false} isLoadingText="Signing in">
        Sign in
      </Button>

      <Text onPress={goToSignUp} marginTop={2}>
        Don't have an account?
      </Text>
    </Center>
  )
}

export default SignIn
