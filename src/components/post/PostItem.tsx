import { AspectRatio, Box, HStack, IconButton, Image, Stack, Text, VStack, View } from 'native-base'
import React, { memo, useState, useLayoutEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import AvatarEntity from '../common/AvatarEntity'
import { useAppDispatch, useAppSelector } from '../../redux'
import { loadComments } from '../../redux/post/commentReducer'
import { profile } from '../../redux/profile/reducer'
import { get } from 'lodash'
import { getImage } from '../../utils/image'

const PostItem = ({ post, navigation }: any) => {
  const [active, setActive] = useState(false)
  const dispatch = useAppDispatch()
  const user: any = useAppSelector(profile)

  const image = post?.medias?.length ? getImage(post.medias[0]) : null
  return (
    <Box w="full" px={2} mb={2} bgColor="coolGray.200">
      <AvatarEntity username={get(post, 'created_by.name')} avatar={get(post, 'created_by.avatar')} />
      <VStack>
        <Text fontSize="md" mt={1}>
          {get(post, 'content')}
        </Text>
      </VStack>

      {image && (
        <VStack>
          <AspectRatio>
            <Image source={{ uri: image }} alt="image" resizeMode="contain" mt={4} />
          </AspectRatio>
        </VStack>
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

          {/* {post?.react?.length > 0 && (

            <VStack ml={2} mb={1}>
              <Text color={'gray.400'}>{post?.react?.length} person like this!</Text>
            </VStack>
          )} */}
        </VStack>

        <VStack>
          <IconButton icon={<Ionicons name="bookmark-outline" size={30} color="#644AB5" />} />
        </VStack>
      </HStack>
    </Box>
  )
}

export default PostItem
