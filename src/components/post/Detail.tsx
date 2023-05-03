import { ScrollView, HStack, IconButton, Image, Input, Text, VStack, AspectRatio } from 'native-base'
import React, { memo, useState, useLayoutEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import AvatarEntity from '../common/AvatarEntity'
import Comment from './Comment'
import { useAppSelector, useAppDispatch } from '../../redux'
import { commentData, isloading } from '../../redux/post/commentReducer'
import { loadComments } from '../../redux/post/commentReducer'
import CommentLoader from '../CommentLoader'
import { get } from 'lodash'
const Detail = ({ route, navigation }: any) => {
  const [active, setActive] = useState(false)
  const [txt, setTxt] = useState('')
  const post = route?.params || null
  const user = {
    id: 2,
  }
  const dispatch = useAppDispatch()

  const isLoading = useAppSelector(isloading)
  const data = useAppSelector(commentData)
  // useLayoutEffect(() => {
  //   if (post.react) {
  //     const arr = post.react.map((val: any) => Number(val.id))
  //     if (arr.includes(user.id)) {
  //       setActive(true)
  //     }
  //   }
  //   dispatch(loadComments({ query: { post_id: post?.id } }))
  // }, [post.react])
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <HStack w="full" alignItems={'center'}>
          <Ionicons name="chevron-back-outline" size={33} color="#fff" onPress={(e) => navigation.goBack()} />
          <AvatarEntity username={get(post, 'created_by.name')} avatar={get(post, 'created_by.avatar')} />
        </HStack>
      ),
    })
  }, [navigation, route])

  return (
    <ScrollView w="full" px={2} mb={2} bgColor="coolGray.200">
      <VStack>
        <Text fontSize="md" mt={1}>
          {post?.content}
        </Text>
      </VStack>

      {post?.image && (
        <VStack>
          <AspectRatio>
            <Image source={{ uri: post?.image }} alt="image" resizeMode="contain" mt={4} />
          </AspectRatio>
        </VStack>
      )}
      <HStack w="full" justifyContent={'space-evenly'}>
        <VStack w="90%">
          <HStack alignItems={'center'}>
            <IconButton icon={<Ionicons name="heart-outline" size={33} color={`${active ? '#000' : '#644AB5'}`} />} />
            <IconButton icon={<Ionicons name="chatbubble-outline" size={30} color="#644AB5" />} />

            <IconButton icon={<Ionicons name="paper-plane-outline" size={30} color="#644AB5" />} />
          </HStack>

          {/* {post?.react?.length > 0 && (
            <VStack ml={2} mb={1}>
              <Text color={'gray.400'}>{post.react.length} person like this!</Text>
            </VStack>
          )} */}
        </VStack>

        <VStack>
          <IconButton icon={<Ionicons name="bookmark-outline" size={30} color="#644AB5" />} />
        </VStack>
      </HStack>
      <VStack>
        <HStack>
          <Input placeholder="coment.." w="86%" inputMode="text" post={txt} onChangeText={(e) => setTxt(e)} />
          <IconButton icon={<Ionicons name="paper-plane-outline" size={30} color="#644AB5" />} />
        </HStack>
      </VStack>
      {isLoading && (
        <VStack mt={3}>
          <CommentLoader />
        </VStack>
      )}
      <VStack mt={3}>{data.length > 0 && data.map((post, index) => <Comment comment={post} key={index} />)}</VStack>
    </ScrollView>
  )
}

export default memo(Detail)
