import { Center, ScrollView } from 'native-base'
import { createStackNavigator } from '@react-navigation/stack'
import { ToastAndroid } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { RefreshControl } from 'react-native-gesture-handler'
import PostLoader from '../../components/post/PostLoader'
import PostItem from '../../components/post/PostItem'
import Detail from '../../components/post/Detail'
import { api } from '../../utils/api'

const StackView = createStackNavigator()

const Home = ({ navigation }: any) => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      isLoading == false && ToastAndroid.show('Tin tức đã được cập nhật!', ToastAndroid.TOP)
    }, 1000)
  }, [])

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const data: any = await api.post('post/find')
      if (data) setPosts(data)
      setIsLoading(false)
    })()
  }, [])

  const Main = ({ navigation }: any) => {
    return (
      <Center flex={1}>
        {isLoading && <PostLoader />}
        <ScrollView w="full" px={2} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          {posts?.length > 0 &&
            posts?.map((val, index) => <PostItem key={index} value={val} navigation={navigation} />)}
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
