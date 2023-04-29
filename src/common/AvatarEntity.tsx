import { Avatar, View, Text, HStack } from 'native-base';
import { User } from '../types';

const defaultAvatar: string =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80';

const AvatarEntity = ({ username, email, avatar }: User) => {
  return (
    <HStack w="full" alignItems="center" py="2">
      <Avatar
        size="md"
        source={{
          uri: avatar || defaultAvatar,
        }}
      />

      <Text fontSize="lg" pl={2}>
        {username}
      </Text>
    </HStack>
  );
};

export default AvatarEntity;
