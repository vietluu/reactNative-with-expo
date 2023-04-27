import React from 'react'
import { FormControl, Input, Stack, Text, Box, Center, NativeBaseProvider, WarningOutlineIcon } from "native-base"


type Props = {}

const Login = (props: Props) => {
  return (
   <Box>
      <FormControl isInvalid>
        <FormControl.Label>Email</FormControl.Label>
        <Input placeholder="Enter Email" />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Something is wrong.
        </FormControl.ErrorMessage>
      </FormControl>
      </Box>
  )
}

export default Login