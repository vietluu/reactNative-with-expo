import { Avatar, Box, HStack, Text, VStack } from 'native-base'
import React from 'react'
import moment from 'moment/moment'
import 'moment/locale/vi'
const Comment = ({ value }: any) => {
  moment.locale('vi')
  const time: any = moment(value.created_at).utcOffset(+7)
  return (
    <Box w="full" alignItems={'center'} flexDirection={'row'} p={1} mb={1} bgColor={'coolGray.300'} rounded={'sm'}>
      <VStack>
        <Avatar
          size={'md'}
          source={
            value.created_by.avatar ? { uri: value.created_by.avatar } : require('../../../assets/image/Avatar.png')
          }
        />
      </VStack>
      <VStack ml={2} justifyContent={'center'}>
        <HStack alignItems={'center'}>
          <Text>{value.created_by.name || 'viet'}</Text>
        </HStack>
        <HStack alignItems={'center'}>
          <Text>{value.content || 'hiiii'}</Text>
        </HStack>
        <HStack w="full" justifyContent={'space-around'}>
          <Text bgColor={'amber.300'} fontSize={9} textAlign={'right'}>
            {moment(time).fromNow()}
          </Text>
        </HStack>
      </VStack>
    </Box>
  )
}
export default Comment
