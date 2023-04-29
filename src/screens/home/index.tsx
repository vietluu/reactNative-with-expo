import { Center, ScrollView,} from 'native-base';
import React, { useEffect, useState, useCallback } from 'react';
import PostLoader from '../../components/PostLoader';
import PostItem from '../../components/post/PostItem';
import Post from '../../types/post/post.types';
import { createStackNavigator } from '@react-navigation/stack';
import Detail from './Detail';
import { ToastAndroid } from 'react-native';
// import { RefreshControl } from 'react-native-gesture-handler';

const StackView = createStackNavigator();

const Home = ({ navigation }: any) => {
  const [postdata, setPostdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    isLoading == false && setRefreshing(false);
    isLoading == false &&
      ToastAndroid.show('tin tức đã được cập nhật!', ToastAndroid.TOP);
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await fetch(
        'https://642f7da7b289b1dec4b3f5cc.mockapi.io/api/v1/post',
      ).then((res) => res.json());
      if (res) {
        setPostdata(res);
        setIsLoading(false);
      }
    })();
  }, []);
  
  const Main = ({ navigation }: any) => {
    return (
      <Center flex={1}>
        {isLoading && <PostLoader />}
        <ScrollView
          w="full"
          px={2}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
        >
          {postdata?.length > 0 &&
            postdata?.map((val, i) => (
              <PostItem key={i} value={val} navigation={navigation} />
            ))}
        </ScrollView>
      </Center>
    );
  };
  return (
    <StackView.Navigator
      initialRouteName="main"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#644AB5',
        },
      }}
    >
      <StackView.Screen name="My Review" component={Main} />
      <StackView.Screen name="detail" component={Detail} />
    </StackView.Navigator>
  );
};
export default Home;
