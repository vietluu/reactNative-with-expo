import { AspectRatio, Box, HStack, IconButton, Image, Stack, Text, Toast, VStack, useToast, View } from 'native-base'
import React, { memo, useState, useLayoutEffect, useCallback } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useAppDispatch, useAppSelector } from '../../redux'
import { loadComments } from '../../redux/post/commentReducer'
import { profile } from '../../redux/profile/reducer'
import { get } from 'lodash'
import { getImage } from '../../utils/image'
import AvatarEntity from '../common/AvatarEntity'
import { SliderBox } from 'react-native-image-slider-box'
import { api } from '../../utils'
import { likePost } from '../../redux/post/postReducer'
import { useNavigation } from '@react-navigation/native'

const PostItem = ({ post }: any) => {
  const [active, setActive] = useState(false)
  const [saved, setSaved] = useState(false)
  const toast = useToast()
  const dispatch = useAppDispatch()

  const [like, setLike] = useState(false)
  const user: any = useAppSelector(profile)
  const images = post?.medias ? post.medias.map((media: any) => getImage(media)) : []
  const navigation: any = useNavigation()

  useLayoutEffect(() => {
    if (post?.post_user?.is_save) {
      setSaved(post?.post_user?.is_save)
    }
  }, [])

  //handleSavePost
  const handleSavePost = async (id: number) => {
    try {
      const res = await api.post('/post/save', { post_id: id })

      if (res.status === 200 || 202) {
        if (res?.data?.is_save) {
          toast.show({
            title: 'Save Post',
            placement: 'top',
          })
        } else {
          toast.show({
            title: 'UnSave Post',
            placement: 'top',
          })
        }
        setSaved(res?.data?.is_save)
      }
    } catch (error) {
      console.log(error);
    }
  }


  const onLikePost = async (id: number) => {
    const res: any = await dispatch(likePost({ post_id: id }))
    if (res?.payload) {
      setLike(res?.payload?.is_like)
      return res.payload
    } else {
      return
    }
  }

  useLayoutEffect(() => {
    if (post?.post_user?.is_like) {
      setLike(post?.post_user?.is_like)
    }
  }, [])


  return (
    <Box w="full" px={2} mb={2} bgColor="coolGray.200">
      <AvatarEntity username={get(post, 'created_by.name')} avatar={get(post, 'created_by.avatar')} />

      <VStack>
        <Text fontSize="md" mt={1}>
          {get(post, 'content')}
        </Text>
      </VStack>

      {images.length > 0 ? (
        <VStack>
          <SliderBox images={images} />
        </VStack>
      ) : (
        <></>
      )}

      <HStack w="full" justifyContent={'space-evenly'}>
        <VStack w="90%">
          <HStack alignItems={'center'}>
            <IconButton
              icon={<Ionicons name="heart-outline" size={33} color={`${like ? '#000' : '#644AB5'}`} />}
              onPress={(e) => onLikePost(post.id)}
            />
            <IconButton
              icon={<Ionicons name="chatbubble-outline" size={30} color="#644AB5" />}
              onPress={(e) => {
                navigation.navigate('Detail', { post_Item: { ...post, like, onLikePost } })
              }}
            />

            <IconButton icon={<Ionicons name="paper-plane-outline" size={30} color="#644AB5" />} />
          </HStack>

          <VStack ml={1} mb={1}>
            {like && (
              <Text color={'gray.400'} fontSize={9}>
                you has liked this!
              </Text>
            )}
          </VStack>

        </VStack>

        <VStack>
          <IconButton
            icon={
              <Ionicons
                name={saved ? 'bookmark' : 'bookmark-outline'}
                onPress={() => handleSavePost(post?.id)}
                size={30}
                color="#644AB5"
              />
            }
          />
        </VStack>
      </HStack>
    </Box>
  )
}

export default PostItem