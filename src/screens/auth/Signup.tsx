import { useState } from 'react'
import { Input, Stack, Text, Button, Icon, Pressable, Center, NativeBaseProvider, View } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { api } from '../../utils/api'
import { UserSignUp } from '../../types'

const SignUp = ({ navigation }: any) => {
  const [show, setShow] = useState(false)
  const [user, setUser] = useState({ email: '', password: '' })

  const handleSignUp = async () => {
    console.log('user', user)

    const payload: UserSignUp = { email: 'quangtv@rabiloo.com', password: '12345678' }

    try {
      const { data } = await api.post('/auth/local/signup', payload)

      if (!data || !data.access_token) return

      console.log('handleSignUp sucess', data)
      navigation.navigate('LayoutScreen')
    } catch (error) {
      console.error('handleSignUp', error)
    }
  }

  const goToSignIn = () => {
    navigation.navigate('SignInScreen')
  }

  return (
    <View>
      <NativeBaseProvider>
        <Center _dark={{ bg: 'blueGray.900' }} _light={{ bg: 'blueGray.50' }} px={4} flex={1}>
          <Text>SignUp</Text>

          <Stack space={4} w="100%" alignItems="center">
            {/* Email Input */}
            <Input
              w={{
                base: '75%',
                md: '25%',
              }}
              InputLeftElement={<Icon as={<MaterialIcons name="email" />} size={5} ml="2" color="muted.400" />}
              onChangeText={(text) => setUser({ ...user, email: text })}
              defaultValue={user.email}
              placeholder="Email"
            />

            {/* PassWord Input */}
            <Input
              w={{
                base: '75%',
                md: '25%',
              }}
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
              w={{
                base: '75%',
                md: '25%',
              }}
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
          </Stack>

          <Stack
            mb="2.5"
            mt="2"
            direction={{
              base: 'column',
              md: 'row',
            }}
            space={1}
            mx={{
              base: 'auto',
              md: '3',
            }}
          >
            <Button size="md" onPress={handleSignUp}>
              SignUp
            </Button>

            <Text onPress={goToSignIn}>Already have an account?</Text>
          </Stack>
        </Center>
      </NativeBaseProvider>
    </View>
  )
}

export default SignUp
