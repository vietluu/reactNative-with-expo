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
import { loadSavePosts, isloading, postData, postBookMark } from '../../redux/post/postReducer'
import { getImage } from '../../utils/image'
import PostLoader from '../../components/post/PostLoader'
import { RefreshControl } from 'react-native-gesture-handler'
import { SliderBox } from 'react-native-image-slider-box'
import { get } from 'lodash'

const PostStore = ({ navigation }: any) => {
  const [active, setActive] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const isLoading = useAppSelector(isloading)
  const dispatch = useAppDispatch()

  const posts = useAppSelector(postBookMark)

  useLayoutEffect(() => {
    ; (async () => {
      await dispatch(loadSavePosts())
    })()
  }, [])

  const onRefresh = useCallback(() => {
    ; (async () => {
      setRefreshing(true)
      await dispatch(loadSavePosts())
      setRefreshing(false)
      isLoading == false
    })()
  }, [])

  const SavePostItem = ({ post }: any) => {
    const images = post?.medias ? post.medias.map((media: any) => getImage(media)) : []

    const [width, setWidth] = useState<any | number>(150)

    return (
      <>
        <Box w="full" minHeight="150" px={4} mb={2} bgColor="coolGray.200">
          <VStack>
            <Text fontSize="sm" my={2}>
              {get(post, 'content')}
            </Text>
          </VStack>

          {images.length > 0 ? (
            <View>
              <SliderBox sliderBoxHeight={100} parentWidth={width} images={images} />
            </View>
          ) : (
            <></>
          )}
        </Box>
      </>
    )
  }

  let body

  if (isLoading) {
    return <PostLoader />
  } else if (posts.length === 0) {
    body = (
      <ScrollView
        w="full"
        px={2}
        nestedScrollEnabled={true}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text justifyContent="center" fontSize={20} textAlign="center" color="gray.400">
          Không có bài viết nào
        </Text>
      </ScrollView>
    )
  } else {
    body = (
      <>
        <ScrollView
          w="full"
          px={2}
          nestedScrollEnabled={true}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {posts.map((post, index) => (
            <SavePostItem key={index} post={post} />
          ))}
        </ScrollView>
      </>
    )
  }

  return <>{body}</>
}

export default memo(PostStore)
