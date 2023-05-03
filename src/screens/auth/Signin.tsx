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

  const validate = (user: any) => {
    const error = {
      email: '',
      password: '',

    }
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const passwordRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/

    if (user.email === '') {
      error.email = 'Please enter your email'
    }
    else if (!emailRegex.test(user.email)) {
      error.email = "Email didn't match"
    }
    if (user.password === '') {
      error.password = 'Please enter your password'
    }
    else if (!passwordRegex.test(user.password)) {
      error.password = "Password didn't match"
    }


    return error
  }

  const handleSignIn = async () => {
    // if (user.email.trim() === '' || user.password.trim() === '') return


    setErrors(validate(user))
    // setLoading(true)

    const payload: UserSignIn = {
      email: user.email.trim(),
      password: user.password.trim(),
    }

    try {
      const { data } = await api.post('/auth/local/signin', payload)
      const { access_token } = data
      if (!data || !data.access_token) return

      await setToken(access_token)
      navigation.navigate('LayoutScreen')
      setUser({ email: '', password: '' })
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
