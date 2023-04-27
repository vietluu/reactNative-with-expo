import React from 'react'
import { FormControl, Input, Stack, Text, Box, Button, Icon, Pressable, Center, NativeBaseProvider, WarningOutlineIcon } from "native-base"
import { MaterialIcons } from "@expo/vector-icons";


type Props = {}

const Register = (props: Props) => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <Text className='mb-5 text-lg font-bold'>Register</Text>

      <Stack space={4} w="100%" alignItems="center">

        {/* Email Input */}
        <Input w={{
        base: "75%",
        md: "25%"
        }} InputLeftElement={<Icon as={<MaterialIcons name="email" />} size={5} ml="2" color="muted.400" />} placeholder="Email" />
        
        {/* PassWord Input */}
        <Input w={{
          base: "75%",
          md: "25%"
        }} type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
              <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
          </Pressable>} placeholder="Password" />
        
        {/* Confirm PassWord Input */}
        <Input w={{
          base: "75%",
          md: "25%"
        }} type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
              <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
            </Pressable>} placeholder="Password" />
      </Stack>

       <Stack mb="2.5" mt="2" direction={{
            base: "column",
            md: "row"
          }} space={1} mx={{
            base: "auto",
            md: "3"
          }}>
          <Button size="md">Register</Button>   
       </Stack>
    </>
  )
}

export default Register