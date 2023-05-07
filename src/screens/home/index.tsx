import { Center, ScrollView } from 'native-base'
import { createStackNavigator } from '@react-navigation/stack'
import { ToastAndroid } from 'react-native'
import React, { useState, useCallback, useLayoutEffect, memo, useEffect } from 'react'
import { RefreshControl } from 'react-native-gesture-handler'
import PostLoader from '../../components/post/PostLoader'
import PostItem from '../../components/post/PostItem'
import Detail from '../../components/post/Detail'
import { useAppDispatch, useAppSelector } from '../../redux'
import { isloading, loadPosts, postData } from '../../redux/post/postReducer'
import { getProfile } from '../../redux/profile/reducer'

const StackView = createStackNavigator()
const Main = ({ route }: any) => {
  const newData: object = route?.params?.newData
  const [refreshing, setRefreshing] = useState(false)
  const [posts, setPosts]: any[] = useState([])
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(isloading)
  const postsData = useAppSelector(postData)

  useLayoutEffect(() => {
    ;(async () => {
      await Promise.all([dispatch(loadPosts()), dispatch(getProfile())])
    })()
  }, [])
  useEffect(() => {
    if (postsData.length > 0) {
      setPosts(postsData)
    }
    if (posts.length > 0 && newData) {
      setPosts([newData, ...posts])
    }
  }, [newData, postsData])
  const onRefresh = useCallback(() => {
    ;(async () => {
      setRefreshing(true)
      await dispatch(loadPosts())
      setRefreshing(false)
      isLoading == false && ToastAndroid.show('Tin tức đã được cập nhật!', ToastAndroid.TOP)
    })()
  }, [])

  return (
    <Center flex={1}>
      {isLoading ? (
        <PostLoader />
      ) : (
        <ScrollView
          w="full"
          px={2}
          nestedScrollEnabled={true}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {posts.length > 0 && posts.map((post, index) => <PostItem key={index} post={post} />)}
        </ScrollView>
      )}
    </Center>
  )
}
const Home = () => {
  return (
    <StackView.Navigator
      initialRouteName="My Review"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#644AB5',
        },
        headerTintColor: '#fff',
      }}
    >
      <StackView.Screen
        name="My Review"
        component={Main}
        options={{
          headerLeft: () => <></>,
        }}
      />

      <StackView.Screen name="Detail" component={Detail} />
    </StackView.Navigator>
  )
}
export default memo(Home)
