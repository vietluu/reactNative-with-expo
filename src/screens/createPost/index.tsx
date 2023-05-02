import { Button, Center, CheckIcon, FormControl, Input, Select, Stack, View, TextArea, Spinner } from 'native-base'
import { useState, useEffect, memo } from 'react'
import { api } from '../../utils'
import { ICategory } from '../../types'
import { ICreatePost } from '../../types/post/post.types'
import { useToast } from 'native-base'

const initPost = { name: '', content: '' }

const CreatePost = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState(false)
  const [creating, setCreating] = useState(false)
  const [categoryId, setCategoryId] = useState('')
  const [post, setPost] = useState<ICreatePost>(initPost)
  const [categories, setCategories] = useState<ICategory[]>([])
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
        category: {
          id: +categoryId,
        },
        // medias: [
        //   {
        //     id: 3,
        //   },
        //   {
        //     id: 2,
        //   },
        // ],
      }

      const response = await api.post('/post', payload)
      if (response.status === 200 || 202) {
        toast.show({
          title: 'Create post success',
          placement: 'top',
        })
      }
    } catch (error) {
      console.error('handleCreatePost: ', error)
    }

    setCategoryId('')
    setPost(initPost)
    setCreating(false)
  }

  return (
    <View w="full" padding={4}>
      {isLoading ? (
        <Spinner accessibilityLabel="Loading posts" />
      ) : (
        <>
          <View display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
            {categories.length ? (
              <Select
                selectedValue={categoryId}
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
        </>
      )}
    </View>
  )
}
export default memo(CreatePost)
