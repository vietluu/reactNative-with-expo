import { Avatar, Text, HStack } from 'native-base'
import { User } from '../../types/user'

const colors = ['#475569']

const AvatarEntity = ({ username, email, avatar }: User) => {
  const name = username ? username.charAt(0)?.toUpperCase() : null
  const randomColor = colors[0]

  return (
    <HStack w="full" alignItems="center" py="2">
      {avatar ? (
        <Avatar
          size="md"
          source={{
            uri: avatar,
          }}
        ></Avatar>
      ) : (
        <Avatar
          size="md"
          bg={randomColor}
          color={'white'}
          source={{
            uri: avatar,
          }}
        >
          {name}
        </Avatar>
      )}

      <Text fontSize="lg" pl={2}>
        {username}
      </Text>
    </HStack>
  )
}

export default AvatarEntity
