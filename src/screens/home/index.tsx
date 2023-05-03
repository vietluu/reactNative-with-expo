import { Center, ScrollView } from 'native-base'
import { createStackNavigator } from '@react-navigation/stack'
import { ToastAndroid } from 'react-native'
import React, { useState, useCallback, useLayoutEffect } from 'react'
import { RefreshControl } from 'react-native-gesture-handler'
import PostLoader from '../../components/post/PostLoader'
import PostItem from '../../components/post/PostItem'
import Detail from '../../components/post/Detail'
import { useAppDispatch, useAppSelector } from '../../redux'
import { isloading, loadPosts, postData } from '../../redux/post/postReducer'
import { getProfile } from '../../redux/profile/reducer'

const StackView = createStackNavigator()

const Home = ({ navigation }: any) => {
  const [refreshing, setRefreshing] = useState(false)
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(isloading)
  const posts = useAppSelector(postData)

  useLayoutEffect(() => {
    ;(async () => {
      await dispatch(loadPosts())
      await dispatch(getProfile())
    })()
  }, [])
  const onRefresh = useCallback(() => {
    ;(async () => {
      setRefreshing(true)
      await dispatch(loadPosts())

      setRefreshing(false)
      isLoading == false && ToastAndroid.show('Tin tức đã được cập nhật!', ToastAndroid.TOP)
<<<<<<< HEAD
    }, 1000)
  }, [])

  useEffect(() => {
    ; (async () => {
      setIsLoading(true)
      const data: any = await api.post('post/find')
      if (data) setPosts(data.data)
      setIsLoading(false)
=======
>>>>>>> 710386749034f6a427056da08f5511142144b676
    })()
  }, [])

  const Main = ({ navigation }: any) => {
    return (
      <Center flex={1}>
        {isLoading && <PostLoader />}
        <ScrollView w="full" px={2} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          {posts?.length > 0 && posts?.map((val, index) => <PostItem key={index} post={val} navigation={navigation} />)}
        </ScrollView>
      </Center>
    )
  }

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
export default Home
