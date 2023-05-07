import { Avatar, Box, HStack, Text, VStack } from 'native-base'
import React, { memo } from 'react'
import moment from 'moment/moment'
import 'moment/locale/vi'
import { get } from 'lodash'
import AvatarEntity from '../common/AvatarEntity'
const Comment = ({ comment }: any) => {
  moment.locale('vi')
  const time: any = moment(comment.created_at).utcOffset(+7)
  return (
    <Box w="full" alignItems={'center'} flexDirection={'row'} p={1} mb={1} bgColor={'coolGray.300'} rounded={'sm'}>
      <VStack>
        <AvatarEntity
          username={get(comment, 'created_by.name')}
          avatar={get(comment, 'created_by.avatar')}
          isTextAvatar={true}
        />
      </VStack>

      <VStack ml={2} justifyContent={'center'}>
        <HStack alignItems={'center'}>
          <Text>{get(comment, 'created_by.name')}</Text>
        </HStack>
        <HStack alignItems={'center'}>
          <Text>{get(comment, 'content')}</Text>
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
export default memo(Comment)
