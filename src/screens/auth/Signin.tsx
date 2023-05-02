import { useState } from 'react'
import { api } from '../../utils/api'
import { API_URL } from '@env'
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
  const [errors, setErrors] = useState({
    email: '', password: '', confirmPassword: ''
  })


  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(isloading)





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


  //handleSignIn
  const handleSignIn = async () => {
    setLoading(true)
    setErrors(validate(user))

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
          defaultValue={user.email}
          placeholder="Email"
          onChangeText={(text) => {
            setUser({ ...user, email: text })
          }}
        />
        {errors.email && <Text color="error.500">{errors.email}</Text>}


        {/* Password Input */}
        <Input
          marginTop={4}
          type={show ? 'text' : 'password'}
          InputLeftElement={<Icon as={<MaterialIcons name="vpn-key" />} size={5} ml="2" color="muted.400" />}
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

          defaultValue={user.password}
          placeholder="Password"
          onChangeText={(text) => {
            setUser({ ...user, password: text })
          }}
        />
        {errors.password && <Text color="error.500">{errors.password}</Text>}


        <Button
          title="Submit"
          w={'full'}
          onPress={handleSignIn}
          marginTop={4}
          isLoading={loading}
          isLoadingText="Signing in"
        >
          Sign in
        </Button>
      </FormControl>


      <Text onPress={goToSignUp} marginTop={2}>
        Don't have an account?
      </Text>
    </Center>
  )
}

export default SignIn
