import { useState } from 'react'
import { api } from '../../utils/api'
import { setToken } from '../../utils/token'
import { UserSignIn } from '../../types'
import { MaterialIcons } from '@expo/vector-icons'
import { Input, Text, Button, Icon, Pressable, Center, FormControl } from 'native-base'
const SignIn = ({ navigation }: any) => {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })



  const validate = () => {
    let isValid = true

    if (!user.email) {
      handleError('Please input email', 'email')
      isValid = false
    } else if (!user.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email')
      isValid = false
    }
    if (!user.password) {
      handleError('Please input password', 'password')
      isValid = false
    } else if (user.password.length < 8) {
      handleError('Min password length of 8', 'password')
      isValid = false
    }
    return isValid
  }


  const handleError = (errorMessage: any, user: any) => {
    setErrors((prev) => ({ ...prev, [user]: errorMessage }))
  }

  const handleSignIn = async () => {

    setLoading(true)

    if (!validate()) {
      setLoading(false)
      return false
    }


    const payload: UserSignIn = {
      email: user.email.trim(),
      password: user.password.trim(),
    }

    try {
      const { data } = await api.post('/auth/local/signin', payload)
      const { access_token } = data
      if (access_token) {
        await setToken(access_token)
        navigation.navigate('LayoutScreen')
        setUser({ email: '', password: '' })
      }
    } catch (error) {
      console.error('handleSignIn', error)
    }

    setLoading(false)
  }

  const goToSignUp = () => {
    navigation.navigate('SignUpScreen')
    setUser({ email: '', password: '' })
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
          // error={errors.email}
          onFocus={() => {
            handleError(null, 'email')
          }}
        />

        {errors.email ? <Text color="error.500">{errors.email}</Text> : null}

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
          // error={errors.password}
          onFocus={() => {
            handleError(null, 'password')
          }}
        />
        {errors.password && <Text color="error.500">{errors.password}</Text>}
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
