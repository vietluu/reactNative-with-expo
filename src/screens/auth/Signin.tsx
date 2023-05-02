import { useState } from 'react'
import { api } from '../../utils/api'
import { API_URL } from '@env'
import { setToken } from '../../utils/token'
import { UserSignIn } from '../../types'
import { MaterialIcons } from '@expo/vector-icons'
import { Input, Text, Button, Icon, Pressable, Center, FormControl } from 'native-base'
import { Formik } from 'formik'
import * as Yup from 'yup'

interface Values {
  email: string
  password: string
}

const SignIn = ({ navigation }: any) => {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({ email: '', password: '' })


  //SignInSchema
  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Please enter your email!'),
    password: Yup.string()
      .min(8, 'Password must be 8 characters long!')
      .max(16, 'Too Long!')
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Must contain minium 8 characters including 1 uppercase letter, 1 special character, and alphanumeric characters"
      )
      .required('Please enter your password!'),
  })

  //handleSignIn
  const handleSignIn = async () => {

    setLoading(true)
    const payload: UserSignIn = user

    try {
      const { data } = await api.post('/auth/local/signin', JSON.parse(JSON.stringify(payload)))
      const { access_token } = data
      if (!data || !data.access_token) return

      console.log('sign in success', data)
      await setToken(access_token)
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
        Sign In
      </Text>

      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={(
          values: Values
        ) => {
          console.log('submit');

          handleSignIn()
        }}
        validationSchema={SignInSchema}
      >

        {({ handleSubmit, handleBlur, handleChange, errors, touched }) => (
          <FormControl>
            {/* Email Input */}
            <Input
              marginTop={4}
              InputLeftElement={<Icon as={<MaterialIcons name="email" />} size={5} ml="2" color="muted.400" />}
              onBlur={handleBlur("email")}
              onChangeText={handleChange('email')}
              defaultValue={user.email}
              placeholder="Email"
            // onChangeText={(text) => setUser({ ...user, email: text })}
            />
            {errors.email && touched.email ? <Text color="error.500">{errors.email}</Text> : null}


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
              onBlur={handleBlur("password")}
              onChangeText={handleChange('password')}
              defaultValue={user.password}
              placeholder="Password"
            // onChangeText={(text) => setUser({ ...user, password: text })}
            />
            {errors.email && touched.password ? <Text color="error.500">{errors.password}</Text> : null}


            <Button title="Submit" w={'full'} onPress={() => handleSubmit()} marginTop={4} isLoading={loading} isLoadingText="Signing in">
              Sign in
            </Button>


          </FormControl>
        )}
      </Formik>


      <Text onPress={goToSignUp} marginTop={2}>
        Don't have an account?
      </Text>
    </Center>
  )
}

export default SignIn
