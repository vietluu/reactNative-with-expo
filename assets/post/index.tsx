import { NavigationAction } from '@react-navigation/native';
import { Center, Text } from 'native-base';
import React from 'react';
import PostLoader from '../../src/lib/PostLoader';
import CommentLoader from '../../src/lib/CommentLoader';
const Post = ({ navigation }: any) => {
  return (
    <Center
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
      px={4}
      flex={1}
    >
      {/* <PostItem /> */}
      <PostLoader />
      <CommentLoader />
    </Center>
  );
};
export default Post;
