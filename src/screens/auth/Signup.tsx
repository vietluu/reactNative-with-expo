import { useState } from 'react'
import { Input, Text, Button, Icon, Pressable, Center, FormControl, useToast } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { api } from '../../utils/api'
import { UserSignUp } from '../../types'

const SignUp = ({ navigation }: any) => {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({ email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const toast = useToast()


  const validate = () => {
    let isValid = true
    if (!user.email) {
      handleError("Please input email", "email")
      isValid = false
    }
    else if (!user.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }
    if (!user.password) {
      handleError("Please input password", "password")
      isValid = false
    } else if (user.password.length < 8) {
      handleError('Min password length of 8', 'password');
      isValid = false;
    }
    if (!user.confirmPassword) {
      handleError("Please input confirmPassword", "confirmPassword")
      isValid = false
    } else if (user.confirmPassword.length < 8) {
      handleError('Min confirmPassword  length of 8', 'confirmPassword');
      isValid = false;
    } else if (user.confirmPassword !== user.password) {
      handleError('confirmPassword  do not match', 'confirmPassword');
      isValid = false;
    }

    if (isValid) {
      handleSignUp()
    }
  }

  const handleError = (errorMessage: any, user: any) => {
    setErrors((prev) => ({ ...prev, [user]: errorMessage }))
  }

  //handleSignUp
  const handleSignUp = async () => {

    setLoading(true)

    const payload: UserSignUp = user

    try {
      const { data } = await api.post('/auth/local/signup', payload)

      if (!data || !data.access_token) return
      toast.show({
        title: 'Register success',
        placement: 'top',
      })
      navigation.navigate('SignInScreen')
      setUser({ email: '', password: '', confirmPassword: '' })
    } catch (error) {
      toast.show({
        title: 'Register failed',
        placement: 'top',
      })
      console.error('handleSignUp', error)
    }
    setLoading(false)
  }

  const goToSignIn = () => {
    navigation.navigate('SignInScreen')
    setUser({ email: '', password: '', confirmPassword: '' })
  }


  return (
    <Center _dark={{ bg: 'blueGray.900' }} _light={{ bg: 'blueGray.50' }} px={4} flex={1}>
      <Text fontSize={'xl'} fontWeight={'medium'}>
        Sign Up
      </Text>

      <FormControl>
        {/* Email Input */}
        <Input
          marginTop={4}
          InputLeftElement={<Icon as={<MaterialIcons name="email" />} size={5} ml="2" color="muted.400" />}
          placeholder="Email"
          defaultValue={user.email}
          onChangeText={(text) => {
            setUser({ ...user, email: text })
          }}
          error={errors.email}
          onFocus={() => {
            handleError(null, "email")
          }}
        />
        {errors.email && <Text color="error.500">{errors.email}</Text>}

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
          placeholder="Password"
          defaultValue={user.password}
          onChangeText={(text) => {
            setUser({ ...user, password: text })
          }}
          error={errors.password}
          onFocus={() => {
            handleError(null, "password")
          }}
        />
        {errors.password && <Text color="error.500">{errors.password}</Text>}

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
          placeholder="Confirm Password"
          defaultValue={user.confirmPassword}
          onChangeText={(text) => {
            setUser({ ...user, confirmPassword: text })
          }}
          error={errors.confirmPassword}
          onFocus={() => {
            handleError(null, "confirmPassword")
          }}
        />
        {errors.confirmPassword && <Text color="error.500">{errors.confirmPassword}</Text>}

        <Button
          w={'full'}
          title="Submit"
          onPress={validate}
          marginTop={4}
          isLoading={loading}
          isLoadingText="Signing up"
        >
          Sign Up
        </Button>
      </FormControl>

      <Text onPress={goToSignIn} marginTop={2}>
        Already have an account?
      </Text>
    </Center>
  )
}

export default SignUp
