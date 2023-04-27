import { Center, HStack, Skeleton } from 'native-base';
import { Rect } from 'react-native-svg';
const CommentLoader = () => {
  return (
    <Center>
      <HStack alignItems="center" justifyContent="center">
        <Skeleton size="12" rounded="full" />
        <Skeleton.Text lines={3} w="90%" p={3} />
      </HStack>
    </Center>
  );
};
export default CommentLoader;
