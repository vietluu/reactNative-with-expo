import {
  ScrollView,
  HStack,
  IconButton,
  Image,
  Input,
  Text,
  VStack,
  AspectRatio,
  Actionsheet,
  View,
  Pressable,
  Button,
  Center,
} from 'native-base'
import React, { memo, useState, useEffect, useLayoutEffect, useCallback } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import AvatarEntity from '../common/AvatarEntity'
import Comment from './Comment'
import { useAppSelector, useAppDispatch } from '../../redux'
import { commentData, commentUpdate, isloading } from '../../redux/post/commentReducer'
import { loadComments, commentDeletes, addNewComment } from '../../redux/post/commentReducer'
import CommentLoader from '../CommentLoader'
import { ToastAndroid, Alert } from 'react-native'
import { useDisclose } from 'native-base'
import { profile } from '../../redux/profile/reducer'
import _ from 'lodash'
import { getImage } from '../../utils/image'
import { SliderBox } from 'react-native-image-slider-box'
import { getOnePost, likePost } from '../../redux/post/postReducer'

const Detail = ({ route, navigation }: any) => {
  const param = route?.params?.param
  const postData = route?.params?.post_Item
  const [post, setPost]: any = useState({})
  const [like, setLike] = useState(postData?.like || false)
  const [txt, setTxt] = useState('')
  const [isSelectUpdate, setIsSelectUpdate] = useState(false)
  const [select, setSelect]: any = useState(null)
  const [txtChange, setTxtChange] = useState('')
  const [cmtData, setCmtData]: any = useState([])
  const [disable, setDisable] = useState(false)
  const data = useAppSelector(commentData)
  const { isOpen, onOpen, onClose } = useDisclose()
  const isLoading: boolean = useAppSelector(isloading)
  const user: any = useAppSelector(profile)
  const dispatch = useAppDispatch()
  console.log(disable)
  useLayoutEffect(() => {
    ;(async () => {
      if (param) {
        const res = await dispatch(getOnePost(param?.id))
        if (res.payload) {
          setPost(res.payload)
          setCmtData(res?.payload?.comments)
          setLike(res.payload?.post_users[0]?.is_like || false)
        }
      } else {
        setPost(postData)
      }
    })()
  }, [param])

  useEffect(() => {
    if (data?.length > 0) {
      setCmtData(data?.filter((e: any) => e?.post_id === post.id))
    }
  }, [data])

  useLayoutEffect(() => {
    ;(async () => {
      param == null && (await dispatch(loadComments({ query: { post_id: post?.id } })))
    })()
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <HStack w="full" alignItems={'center'}>
          <Ionicons name="chevron-back-outline" size={33} color="#fff" onPress={() => onCloseModal()} />
          <AvatarEntity username={_.get(post, 'created_by.name')} avatar={_.get(post, 'created_by.avatar')} />
        </HStack>
      ),
    })
  }, [post])

  const onLikePost = async (id: number) => {
    const res: any = await dispatch(likePost({ post_id: id }))
    if (res.payload) {
      setLike(res?.payload?.is_like)
    }
  }

  const onCloseModal = async () => {
    try {
      Alert.alert('My Review ', 'Bạn có chắc chắn muốn thoát?', [
        {
          text: 'Hủy',
          onPress: () => {
            return
          },
          style: 'cancel',
        },
        { text: 'OK', onPress: () => navigation.goBack() },
      ])
    } catch (error) {
      ToastAndroid.show('Đã xảy ra lỗi!', ToastAndroid.SHORT)
    }
  }
  const onLike = async (id: number) => {
    const res: any = await post?.onLikePost(id)
    if (res) {
      setLike(res.is_like)
    }
  }

  const onDelCmt = async (id: any) => {
    onClose()

    try {
      if (id) {
        Alert.alert('My Review ', 'Bạn chắc chắn muốn xóa?', [
          {
            text: 'Hủy',
            onPress: () => {
              return
            },
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              ToastAndroid.show('Đang xóa!', ToastAndroid.LONG)
              const res: any = await dispatch(commentDeletes(id))
              if (res.payload.message === 'success') {
                setDisable(false)
                const newArr = cmtData?.filter((e: any) => e.id !== select.id) || []
                setCmtData(newArr)
                ToastAndroid.show('Xóa thành công!', ToastAndroid.SHORT)
              }
            },
          },
        ])
      } else {
        setDisable(false)
        ToastAndroid.show('Đã xảy ra lỗi!', ToastAndroid.SHORT)
        await dispatch(loadComments({ query: { post_id: post?.id } }))
      }
    } catch (error) {
      ToastAndroid.show('Đã xảy ra lỗi!', ToastAndroid.SHORT)
      await dispatch(loadComments({ query: { post_id: post?.id } }))
    }
  }
  const submitDelay = _.debounce(() => submit(), 1000)

  const submit = async () => {
    try {
      console.log('run')
      if (select?.id && txtChange) {
        if (txtChange.trim() === '') {
          setDisable(false)
          return
        }
        const body = {
          post_id: post.id,
          id: select.id,
          content: txtChange,
        }
        ToastAndroid.show('Đang sửa...!', ToastAndroid.LONG)
        const res: any = await dispatch(commentUpdate(body))
        if (res.payload) {
          setTxtChange('')
          setDisable(false)
          setSelect(null)
          setIsSelectUpdate(false)
          const newData: any = cmtData?.map((value: any) => {
            if (value.id === select.id) {
              value = res.payload
            }
            return value
          })
          setCmtData(newData)
          ToastAndroid.show('Đã sửa bình luận!', ToastAndroid.SHORT)
        }
      } else {
        if (txt.trim() === '') {
          setDisable(false)
          return
        }
        const data = {
          post_id: post.id,
          content: txt,
        }
        const res: any = await dispatch(addNewComment(data))
        ToastAndroid.show('Đang gửi!', ToastAndroid.LONG)
        if (res?.payload) {
          setTxt('')
          setDisable(false)
          const newArr: any = [...cmtData, res.payload]
          setCmtData(newArr)
          ToastAndroid.show('Đã bình luận!', ToastAndroid.SHORT)
        }
      }
    } catch (error) {
      ToastAndroid.show('Đã xảy ra lỗi!', ToastAndroid.SHORT)
      await dispatch(loadComments({ query: { post_id: post?.id } }))
    }
  }

  const onUpdateComment = async (id: any) => {
    onClose()
    const value: any = cmtData?.find((e: any) => e.id === id)
    setTxtChange(value?.content)
    setIsSelectUpdate(true)
  }

  const images = post?.medias ? post.medias.map((media: any) => getImage(media)) : []

  return (
    <ScrollView w="full" px={2} mb={2} bgColor="coolGray.200" onTouchMove={onClose}>
      <VStack>
        <Text fontSize="md" mt={1}>
          {post?.content}
        </Text>
      </VStack>

      {images?.length > 0 ? (
        <VStack>
          <SliderBox images={images} />
        </VStack>
      ) : (
        <></>
      )}

      {/* Section actions */}
      <HStack w="full" justifyContent={'space-evenly'}>
        <VStack w="90%">
          <HStack alignItems={'center'}>
            <IconButton
              icon={<Ionicons name="heart-outline" size={33} color={`${like ? '#000' : '#644AB5'}`} />}
              onPress={(e) => {
                param ? onLikePost(post.id) : onLike(post.id)
              }}
            />
            <IconButton icon={<Ionicons name="chatbubble-outline" size={30} color="#644AB5" />} />

            <IconButton icon={<Ionicons name="paper-plane-outline" size={30} color="#644AB5" />} />
          </HStack>
          <VStack ml={1} mb={1}>
            {like && (
              <Text color={'gray.400'} fontSize={9}>
                You has liked this!
              </Text>
            )}
          </VStack>
        </VStack>

        <VStack>
          <IconButton icon={<Ionicons name="bookmark-outline" size={30} color="#644AB5" />} />
        </VStack>
      </HStack>
      <VStack>
        <HStack>
          <Input placeholder="coment.." w="86%" inputMode="text" value={txt} onChangeText={(e) => setTxt(e)} />
          <IconButton
            disabled={disable}
            icon={<Ionicons name="paper-plane-outline" size={30} color="#644AB5" />}
            onPress={(e) => {
              setDisable(true)
              submitDelay()
            }}
          />
        </HStack>
      </VStack>

      {/* Comment */}
      {cmtData?.length > 0 ? (
        <VStack mt={3}>
          {cmtData?.map((comment: any, index: number) => (
            <View key={index}>
              {select?.id === comment.id && isSelectUpdate ? (
                <Center bgColor={'fuchsia.50'}>
                  <HStack>
                    <Input
                      isFocused
                      w="full"
                      placeholder="Comment.."
                      inputMode="text"
                      value={txtChange}
                      onChangeText={(e) => setTxtChange(e)}
                    />
                  </HStack>
                  <HStack w="full" p={1} justifyContent={'flex-end'}>
                    <Button h={5} px={1} py={0} mx={1}>
                      <Text
                        fontSize={11}
                        onPress={(e) => {
                          setDisable(true)
                          setTxtChange('')
                          setSelect(null)
                          setIsSelectUpdate(false)
                        }}
                      >
                        Cancel
                      </Text>
                    </Button>
                    <Button h={5} px={1} py={0}>
                      <Text
                        fontSize={11}
                        onPress={(e) => {
                          console.log('ok')
                          setDisable(true)
                          submitDelay()
                        }}
                        disabled={disable}
                      >
                        Submit
                      </Text>
                    </Button>
                  </HStack>
                </Center>
              ) : (
                <Pressable
                  onLongPress={() => {
                    setSelect(comment)
                    onOpen()
                  }}
                >
                  <Comment comment={comment} />
                </Pressable>
              )}

              <Actionsheet isOpen={isOpen} onClose={onClose} disableOverlay size="full">
                {select?.created_by_id === user.id ? (
                  <Actionsheet.Content>
                    <Actionsheet.Item onPress={(e) => onUpdateComment(select.id)}>Sửa bình luận</Actionsheet.Item>
                    <Actionsheet.Item onPress={(e) => onDelCmt(select.id)}>Xóa bình luận</Actionsheet.Item>
                  </Actionsheet.Content>
                ) : (
                  <Actionsheet.Content>
                    <Actionsheet.Item>HIHI</Actionsheet.Item>
                  </Actionsheet.Content>
                )}
              </Actionsheet>
            </View>
          ))}
        </VStack>
      ) : (
        <Center>
          {isLoading ? (
            <VStack mt={3}>
              <CommentLoader />
            </VStack>
          ) : (
            <Text mt={4} color={'coolGray.500'}>
              Không có bình luận nào!
            </Text>
          )}
        </Center>
      )}
    </ScrollView>
  )
}

export default memo(Detail)
