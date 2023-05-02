import { Avatar, View, Text, HStack } from 'native-base'
import { User } from '../../types/user'

const AvatarEntity = ({ username, email, avatar }: User) => {
  return (
    <HStack w="full" alignItems="center" py="2">
      <Avatar
        size="md"
        source={
          avatar
            ? {
                uri: avatar,
              }
            : require('../../../assets/image/Avatar.png')
        }
      />

      <Text fontSize="lg" pl={2}>
        {username}
      </Text>
    </HStack>
  )
}

export default AvatarEntity
