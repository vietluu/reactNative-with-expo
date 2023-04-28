import { Center } from 'native-base';
import React from 'react';
import PostLoader from '../../components/PostLoader';
import CommentLoader from '../../components/CommentLoader';

const Home = ({ navigation }: any) => {
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
export default Home;
