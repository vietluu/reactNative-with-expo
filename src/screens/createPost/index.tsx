import {
  Button,
  CheckIcon,
  FormControl,
  Input,
  Select,
  Stack,
  View,
  TextArea,
  Spinner,
  useToast,
  Center,
  ScrollView,
  Actionsheet,
} from 'native-base'
import { useState, useEffect, memo } from 'react'
import { api } from '../../utils'
import { ICategory } from '../../types'
import { ICreatePost } from '../../types/post/post.types'
import * as ImagePicker from 'expo-image-picker'
import { Image } from 'native-base'
import { IMedia } from '../../types/media/media.types'

const initPost = { name: '', content: '' }

const CreatePost = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [creating, setCreating] = useState(false)
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const [post, setPost] = useState<ICreatePost>(initPost)
  const [images, setImages] = useState<string[]>([])
  const [medias, setMedias] = useState<IMedia[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const toast = useToast()

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const { data } = await api.get('/category')
      setCategories(data)
      setIsLoading(false)
    })()
  }, [])

  const handleCreatePost = async () => {
    setCreating(true)
    try {
      const payload: ICreatePost = {
        ...post,
        ...(categoryId
          ? {
              category: {
                id: +categoryId,
              },
            }
          : {}),
        ...(medias.length ? { medias } : {}),
      }

      const response = await api.post('/post', payload)
      if (response.status === 200 || 202) {
        toast.show({
          title: 'Create post success',
          placement: 'top',
        })

        navigation.navigate('My Review', { newData: response.data })
      }
    } catch (error) {
      console.error('handleCreatePost: ', error)
    }

    resetPost()
    setCreating(false)
  }

  const handleUploadImage = async () => {
    // No permissions request is necessary for launching the image library
    if (isLoading) return
    try {
      // pick image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      })

      if (result.canceled) return
      const image = result.assets[0].uri
      closeActionSheet()

      // upload image
      const formData = new FormData()
      formData.append('image', { name: 'image.jpeg', uri: image, type: 'image/jpeg' } as any, 'image.jpeg')

      setUploading(true)
      const response = await api.post('/media/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })

      if (response.status === 200 && response.data) {
        setImages([...images, image])
        setMedias([...medias, response.data])
      }
    } catch (error) {
      closeActionSheet()
      console.error('handleUploadImage error:', error)
    }

    setUploading(false)
  }

  // reset post data to empty
  const resetPost = () => {
    setCategoryId(null)
    setImages([])
    setPost(initPost)
  }

  const closeActionSheet = () => {
    setIsOpen(false)
  }

  const showActionSheet = () => {
    setIsOpen(true)
  }

  const handlePhotoImage = async () => {
    if (isLoading) return
    try {
      // pick image
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      })

      if (result.canceled) return
      const image = result.assets[0].uri
      closeActionSheet()

      // upload image
      const formData = new FormData()
      formData.append('image', { name: 'image.jpeg', uri: image, type: 'image/jpeg' } as any, 'image.jpeg')

      setUploading(true)
      const response = await api.post('/media/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })

      if (response.status === 200 && response.data) {
        setImages([...images, image])
        setMedias([...medias, response.data])
      }
    } catch (error) {
      console.error('handleUploadImage error:', error)
      closeActionSheet()
    }

    setUploading(false)
  }

  return (
    <View w="full" paddingBottom={4}>
      {isLoading ? (
        <Spinner accessibilityLabel="Loading posts" />
      ) : (
        <ScrollView padding={4}>
          <View display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
            {categories.length ? (
              <Select
                selectedValue={categoryId as any}
                minWidth={200}
                placeholder="Select a category"
                onValueChange={(value) => setCategoryId(value)}
                _selectedItem={{
                  bg: 'cyan.600',
                  endIcon: <CheckIcon size={4} />,
                }}
              >
                {categories.map((category, i) => (
                  <Select.Item key={i} label={category.name as string} value={category.id as string}></Select.Item>
                ))}
              </Select>
            ) : (
              <></>
            )}

            <Button onPress={handleCreatePost} isLoading={creating} isLoadingText="Creating">
              Create
            </Button>

            <Button onPress={showActionSheet} isLoading={uploading} isLoadingText="Uploading">
              Image
            </Button>
          </View>

          <View w="full">
            <FormControl>
              <Stack>
                <FormControl.Label>Title</FormControl.Label>
                <Input
                  placeholder="Please enter title"
                  onChangeText={(text) => setPost({ ...post, name: text })}
                  defaultValue={post.name}
                />
              </Stack>

              <Stack>
                <FormControl.Label>Content</FormControl.Label>
                <TextArea
                  h={40}
                  placeholder="Please enter content"
                  autoCompleteType={undefined}
                  onChangeText={(text) => setPost({ ...post, content: text })}
                  defaultValue={post.content}
                />
              </Stack>
            </FormControl>
          </View>

          <Center width={'full'}>
            {images.map((image, index) => (
              <Image
                key={index}
                source={{
                  uri: image || '../../../assets/image/default.jpg',
                }}
                alt="Alternate Text"
                size="xl"
                marginTop={4}
              />
            ))}
          </Center>

          <Actionsheet isOpen={isOpen} onClose={closeActionSheet} disableOverlay size="full">
            <Actionsheet.Content>
              <Actionsheet.Item onPress={handlePhotoImage}>Chụp ảnh</Actionsheet.Item>
              <Actionsheet.Item onPress={handleUploadImage}>Tải ảnh</Actionsheet.Item>
            </Actionsheet.Content>
          </Actionsheet>
        </ScrollView>
      )}
    </View>
  )
}
export default memo(CreatePost)
