import { Avatar, View, Text } from 'native-base';
import { User } from '../../types';

const defaultAvatar: string =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80';

const AvatarEntity = ({ username, email, avatar }: User) => {
  return (
    <View className="flex flex-row items-center gap-2">
      <Avatar
        source={{
          uri: avatar || defaultAvatar,
        }}
      />

      <Text className="font-bold text-xl">{username}</Text>
    </View>
  );
};

export default AvatarEntity;
