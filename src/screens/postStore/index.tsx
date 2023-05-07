import {
  AspectRatio,
  Box,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
  VStack,
  View,
  Avatar,
  Center,
  ScrollView,
} from 'native-base'
import React, { memo, useState, useLayoutEffect, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux'
import { profile } from '../../redux/profile/reducer'
import { loadSavePosts, isloading, postData, postBookMark } from '../../redux/post/postReducer'
import { getImage } from '../../utils/image'
import Ionicons from '@expo/vector-icons/Ionicons'
import { ToastAndroid } from 'react-native'
import PostLoader from '../../components/post/PostLoader'
import PostItem from '../../components/post/PostItem'
import { RefreshControl } from 'react-native-gesture-handler'

const PostStore = ({ navigation }: any) => {
  const [active, setActive] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const isLoading = useAppSelector(isloading)
  const dispatch = useAppDispatch()

  const posts = useAppSelector(postBookMark)

  useLayoutEffect(() => {
    ;(async () => {
      await dispatch(loadSavePosts())
    })()
  }, [])

  const onRefresh = useCallback(() => {
    ;(async () => {
      setRefreshing(true)
      await dispatch(loadSavePosts())

      setRefreshing(false)
      isLoading == false && ToastAndroid.show('Tin tức đã được cập nhật!', ToastAndroid.TOP)
    })()
  }, [])

  return (
    <>
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
            {posts.length > 0 &&
              posts.map((post, index) => <PostItem key={index} post={post} navigation={navigation} />)}
          </ScrollView>
        )}
      </Center>
    </>
  )
}

export default memo(PostStore)
