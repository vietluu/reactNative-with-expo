import { AspectRatio, Box, HStack, IconButton, Image, Stack, Text, Toast, VStack, useToast } from 'native-base'
import React, { memo, useState, useLayoutEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useAppDispatch, useAppSelector } from '../../redux'
import { loadComments } from '../../redux/post/commentReducer'
import { profile } from '../../redux/profile/reducer'
import { get } from 'lodash'
import { getImage } from '../../utils/image'
import AvatarEntity from '../common/AvatarEntity'
import { SliderBox } from 'react-native-image-slider-box'
import { api } from '../../utils'

const PostItem = ({ post, navigation }: any) => {
  const [active, setActive] = useState(false)
  const [saved, setSaved] = useState(false)
  const toast = useToast()
  const dispatch = useAppDispatch()

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
        toast.show({
          title: 'Save post success',
          placement: 'top',
        })
        setSaved(res?.data?.is_save)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const images = post?.medias ? post.medias.map((media: any) => getImage(media)) : []

  return (
    <Box w="full" px={2} mb={2} bgColor="coolGray.200">
      <AvatarEntity username={get(post, 'created_by.name')} avatar={get(post, 'created_by.avatar')} />

      <VStack>
        <Text fontSize="md" mt={1}>
          {get(post, 'content')}
        </Text>
      </VStack>

      {images.length ? (
        <VStack>
          <SliderBox images={images} />
        </VStack>
      ) : (
        <></>
      )}

      <HStack w="full" justifyContent={'space-evenly'}>
        <VStack w="90%">
          <HStack alignItems={'center'}>
            <IconButton icon={<Ionicons name="heart-outline" size={33} color={`${active ? '#000' : '#644AB5'}`} />} />
            <IconButton
              icon={<Ionicons name="chatbubble-outline" size={30} color="#644AB5" />}
              onPress={(e) => {
                navigation.navigate('Detail', post)
              }}
            />

            <IconButton icon={<Ionicons name="paper-plane-outline" size={30} color="#644AB5" />} />
          </HStack>
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
