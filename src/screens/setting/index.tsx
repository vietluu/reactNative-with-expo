import React from 'react'
import { NavigationAction } from '@react-navigation/native'
import { Center, Text, Image, HStack, Avatar, Box, Button } from 'native-base'
import Icon from '@expo/vector-icons/Ionicons'

const Setting = ({ navigation }: any) => {


  //handleLogout
  const handleLogout = () => {
    console.log('Pressed Logout');
  }


  return (
    <>
      <Box width="full" height="150" bg="#644AB5">
        <HStack justifyContent="center" position="relative">
          <Avatar
            position="absolute"
            top="20"
            size="2xl"
            bg="amber.500"
            source={{
              uri: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            }}
          />

          <Text position="absolute" top={210} fontSize={30} fontWeight="bold">
            SangPX
          </Text>
        </HStack>
      </Box>

      <Box flexDirection="row" justifyContent="center" alignItems="center" width="90%" bg="#fff" p="5" ml="5" rounded="xl" position="absolute" top="300" shadow={9}>
        <Icon name="ios-location-outline" size={22} color="#000"/>
        <Text color="#000" ml="5">Hanoi</Text>
      </Box>

      <Box flexDirection="row" justifyContent="center" alignItems="center" width="90%" bg="#fff" p="5" ml="5" rounded="xl" position="absolute" top="400" shadow={9}>
        <Icon name="settings-outline" size={22} color="#000" />
        <Text color="#000" ml="5">Setting</Text>
      </Box>

 
      <Button leftIcon={ <Icon name="ios-log-out-outline" size={24} color="#fff" />} justifyContent="center" alignItems="center" width="90%" bg="#644AB5" py="5" ml="5" rounded="xl" position="absolute" top="500" shadow={9} onPress={handleLogout}>
          LogOut
      </Button>
  
    </>
  )
}
export default Setting
