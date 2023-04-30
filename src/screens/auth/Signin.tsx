import React from 'react'
import { Input, Stack, Text, Button, Icon, Pressable, Center, NativeBaseProvider, View } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { api } from '../../utils/api'

const SignIn = ({ navigation }: any) => {
  const [show, setShow] = React.useState(false)

  const handleSignIn = () => {
    console.log('handleSignIn')
    navigation.navigate('LayoutScreen')
    return true
  }

  const goToSignUp = () => {
    navigation.navigate('SignUp')
  }

  return (
    <View className="h-full">
      <NativeBaseProvider>
        <Center _dark={{ bg: 'blueGray.900' }} _light={{ bg: 'blueGray.50' }} px={4} flex={1}>
          <Text>SignIn</Text>

          <Stack space={4} w="100%" alignItems="center">
            {/* Email Input */}
            <Input
              w={{
                base: '75%',
                md: '25%',
              }}
              InputLeftElement={<Icon as={<MaterialIcons name="email" />} size={5} ml="2" color="muted.400" />}
              placeholder="Email"
            />

            {/* Password Input */}
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
            <Button className="w-full" onPress={handleSignIn}>
              Sign in
            </Button>

            <Text onPress={(e) => goToSignUp()}>Dont have an account?</Text>
          </Stack>
        </Center>
      </NativeBaseProvider>
    </View>
  )
}

export default SignIn
