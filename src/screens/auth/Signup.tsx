import { useState } from 'react'
import { Input, Text, Button, Icon, Pressable, Center, FormControl, useToast } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { api } from '../../utils/api'
import { API_URL } from '@env'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { UserSignUp } from '../../types'
import { AnyIfEmpty } from 'react-redux'

interface Values {
  email: string
  password: string
  confirmPassword: string
}

const SignUp = ({ navigation }: any) => {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({ email: '', password: '', confirmPassword: '' })
  const toast = useToast()

  //SignUpSchema
  const SignUpSchema = Yup.object().shape({
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
    confirmPassword: Yup.string()
      .min(8, 'Confirm Password must be 8 characters long!!')
      .max(16, 'Too Long!')
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Must contain minium 8 characters including 1 uppercase letter, 1 special character, and alphanumeric characters"
      )
      .oneOf([Yup.ref("password"), "Password do not match"])
      .required('Please enter your confirm password!')
    ,
  })

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

  return (
    <Center _dark={{ bg: 'blueGray.900' }} _light={{ bg: 'blueGray.50' }} px={4} flex={1}>
      <Text fontSize={'xl'} fontWeight={'medium'}>
        Sign Up
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

          handleSignUp()
        }}
        validationSchema={SignUpSchema}
      >

        {({ handleSubmit, handleBlur, handleChange, errors, touched }) => (
          <FormControl>
            {/* Email Input */}
            <Input
              marginTop={4}
              InputLeftElement={<Icon as={<MaterialIcons name="email" />} size={5} ml="2" color="muted.400" />}
              placeholder="Email"
              onBlur={handleBlur("email")}
              onChangeText={handleChange('email')}
              defaultValue={user.email}
            // onChangeText={(text) => setUser({ ...user, email: text })}
            // value={values.email}
            />
            {errors.email && touched.email ? <Text color="error.500">{errors.email}</Text> : null}

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
              onBlur={handleBlur("Password")}
              onChangeText={handleChange('password')}
              defaultValue={user.password}
            // onChangeText={(text) => setUser({ ...user, password: text })}
            // value={values.password}
            />
            {errors.password && touched.password ? <Text color="error.500">{errors.password}</Text> : null}

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
              onBlur={handleBlur("confirmPassword")}
              onChangeText={handleChange('confirmPassword')}
              defaultValue={user.confirmPassword}
            // onChangeText={(text) => setUser({ ...user, confirmPassword: text })}
            // value={values.confirmPassword}
            />
            {errors.confirmPassword && touched.confirmPassword ? <Text color="error.500">{errors.confirmPassword}</Text> : null}

            <Button w={'full'} title="Submit" onPress={() => handleSubmit()} marginTop={4} isLoading={loading} isLoadingText="Signing up">
              Sign Up
            </Button>


          </FormControl>
        )}
      </Formik>



      <Text onPress={goToSignIn} marginTop={2}>
        Already have an account?
      </Text>
    </Center>
  )
}

export default SignUp
