import React from 'react'
import { FormControl, Input, Stack, Text, Box, Button, Center, NativeBaseProvider, WarningOutlineIcon } from "native-base"


type Props = {}

const Login = (props: Props) => {
  return (
    <>
      <Text className='mb-5 text-lg font-bold'>Login</Text>
      <Stack space={4} w="75%" maxW="300px" mx="auto">
        <Input shadow={2} _light={{
        bg: "coolGray.100",
        _hover: {
          bg: "coolGray.200"
        },
        _focus: {
          bg: "coolGray.200:alpha.70"
        }
          }}
            placeholder="Enter your name" />
      

        <Input shadow={2} _light={{
          bg: "coolGray.100",
          _hover: {
            bg: "coolGray.200"
          },
          _focus: {
            bg: "coolGray.200:alpha.70"
          }
            }}
                placeholder="Enter your Password" />
      </Stack>

      <Stack mb="2.5" mt="2" direction={{
        base: "column",
        md: "row"
      }} space={1} mx={{
        base: "auto",
        md: "3"
      }}>
        <Button size="md">Login</Button>   
      </Stack>
    </>
  )
}

export default Login