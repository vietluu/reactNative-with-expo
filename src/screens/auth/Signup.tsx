import { useState } from 'react'
import { Input, Text, Button, Icon, Pressable, Center, FormControl, useToast } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { api } from '../../utils/api'
import { API_URL } from '@env'


import { UserSignUp } from '../../types'
import { AnyIfEmpty } from 'react-redux'


const SignUp = ({ navigation }: any) => {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({ email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({
    email: '', password: '', confirmPassword: ''
  })

  const toast = useToast()



  //handleSignUp
  const handleSignUp = async () => {
    setLoading(true)

    setErrors(validate(user))

    const payload: UserSignUp = user

    try {
      const { data } = await api.post('/auth/local/signup', payload)

      if (!data || !data.access_token) return
      toast.show({
        title: 'Register success',
        placement: 'top',
      })
      navigation.navigate('SignInScreen')
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
  }


  const validate = (user: any) => {
    const error = {
      email: "",
      password: "",
      confirmPassword: ""

    }
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const passwordRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/

    if (user.email === "") {
      error.email = "Please enter your Email"
    }
    if (!emailRegex.test(user.email)) {
      error.email = "Email didn't match"
    }

    if (user.password === "") {
      error.password = "Please enter your Password"
    }
    if (!passwordRegex.test(user.password)) {
      error.password = "Password didn't match"
    }
    if (user.confirmPassword === "" || user.confirmPassword != user.password) {
      error.confirmPassword = "Password not matched"

    }

    return error
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

        />
        {errors.confirmPassword && <Text color="error.500">{errors.confirmPassword}</Text>}

        <Button
          w={'full'}
          title="Submit"
          onPress={handleSignUp}
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
