import { Avatar, Box, HStack, Text, VStack } from 'native-base'
import React from 'react'

const Comment = ({ route }: any) => {
  const value = route.params
  return (
    <Box>
      <VStack>
        <Avatar
          size={'md'}
          source={
            value.created_by.avatar ? { uri: value.created_by.avatar } : require('../../../assets/image/Avatar.png')
          }
        />
      </VStack>
      <VStack>
        <HStack>
          <Text>{value.created_by.name || 'viet'}</Text>
        </HStack>
        <HStack>
          <Text>{value.content || 'hiiii'}</Text>
        </HStack>
      </VStack>
    </Box>
  )
}
export default Comment
