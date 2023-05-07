import { Avatar, Text, HStack } from 'native-base'
import { User } from '../../types/user'

const colors = ['#475569']

const AvatarEntity = ({ username, avatar, isTextAvatar = false, size = 'md', justifyContent = 'flex-start' }: any) => {
  const name = username ? username.charAt(0)?.toUpperCase() : null
  const randomColor = colors[0]

  return (
    <HStack w="full" alignItems="center" py="2" justifyContent={justifyContent}>
      {avatar ? (
        <Avatar
          size={size || 'md'}
          source={{
            uri: avatar,
          }}
        ></Avatar>
      ) : (
        <Avatar
          size={size || 'md'}
          bg={randomColor}
          color={'white'}
          source={{
            uri: avatar,
          }}
        >
          {name}
        </Avatar>
      )}

      {isTextAvatar ? (
        <></>
      ) : (
        <Text fontSize="lg" pl={2}>
          {username}
        </Text>
      )}
    </HStack>
  )
}

export default AvatarEntity
