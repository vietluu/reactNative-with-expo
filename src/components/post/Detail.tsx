import { Box, ScrollView, HStack, IconButton, Image, Input, Text, VStack, AspectRatio } from 'native-base'
import React, { memo, useState, useLayoutEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import AvatarEntity from '../common/AvatarEntity'
import { TextInput } from 'react-native-gesture-handler'
import Comment from './Comment'
import { useAppSelector } from '../../redux'
import { commentData, isloading } from '../../redux/post/commentReducer'
const Detail = ({ route, navigation }: any) => {
  const [active, setActive] = useState(false)
  const [txt, setTxt] = useState('')
  const value = route?.params || null
  const user = {
    id: 2,
  }

  const isLoading = useAppSelector(isloading)
  const data = useAppSelector(commentData)
  useLayoutEffect(() => {
    if (value.react) {
      const arr = value.react.map((val: any) => Number(val.id))
      if (arr.includes(user.id)) {
        setActive(true)
      }
    }
  }, [value.react])
  console.log(data)
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <HStack w="full" alignItems={'center'}>
          <Ionicons name="chevron-back-outline" size={33} color="#fff" onPress={(e) => navigation.goBack()} />
          <AvatarEntity username={value?.created_by?.name} avatar={value?.created_by?.avatar} />
        </HStack>
      ),
    })
  }, [navigation, route])

  return (
    <ScrollView w="full" px={2} mb={2} bgColor="coolGray.200">
      <VStack>
        <Text fontSize="md" mt={1}>
          {value?.content}
        </Text>
      </VStack>

      {value?.image && (
        <VStack>
          <AspectRatio>
            <Image source={{ uri: value?.image }} alt="image" resizeMode="contain" mt={4} />
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
          {value?.react?.length > 0 && (
            <VStack ml={2} mb={1}>
              <Text color={'gray.400'}>{value.react.length} person like this!</Text>
            </VStack>
          )}
        </VStack>

        <VStack>
          <IconButton icon={<Ionicons name="bookmark-outline" size={30} color="#644AB5" />} />
        </VStack>
      </HStack>
      <VStack>
        <HStack>
          <Input placeholder="coment.." w="86%" inputMode="text" value={txt} onChangeText={(e) => setTxt(e)} />
          <IconButton icon={<Ionicons name="paper-plane-outline" size={30} color="#644AB5" />} />
        </HStack>
      </VStack>
      <VStack mt={3}>{data.length > 0 && data.map((value, index) => <Comment value={value} key={index} />)}</VStack>
    </ScrollView>
  )
}

export default memo(Detail)
