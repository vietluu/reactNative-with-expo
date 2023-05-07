import { Center, ScrollView } from 'native-base'
import { memo, useState, useLayoutEffect, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux'
import { loadSavePosts, isloading, postBookMark } from '../../redux/post/postReducer'
import { ToastAndroid } from 'react-native'
import PostLoader from '../../components/post/PostLoader'
import PostItem from '../../components/post/PostItem'
import { RefreshControl } from 'react-native-gesture-handler'

const PostStore = ({ navigation }: any) => {
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
