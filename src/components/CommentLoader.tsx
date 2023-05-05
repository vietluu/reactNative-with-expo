import { Center, HStack, Skeleton } from 'native-base'

const CommentLoader = () => {
  return (
    <Center>
      <HStack alignItems="center" justifyContent="center" mb={2}>
        <Skeleton size="12" rounded="full" />
        <Skeleton.Text lines={3} w="90%" p={3} />
      </HStack>
      <HStack alignItems="center" justifyContent="center" mb={2}>
        <Skeleton size="12" rounded="full" />
        <Skeleton.Text lines={3} w="90%" p={3} />
      </HStack>
      <HStack alignItems="center" justifyContent="center" mb={2}>
        <Skeleton size="12" rounded="full" />
        <Skeleton.Text lines={3} w="90%" p={3} />
      </HStack>
      <HStack alignItems="center" justifyContent="center" mb={2}>
        <Skeleton size="12" rounded="full" />
        <Skeleton.Text lines={3} w="90%" p={3} />
      </HStack>
      <HStack alignItems="center" justifyContent="center" mb={2}>
        <Skeleton size="12" rounded="full" />
        <Skeleton.Text lines={3} w="90%" p={3} />
      </HStack>
      <HStack alignItems="center" justifyContent="center" mb={2}>
        <Skeleton size="12" rounded="full" />
        <Skeleton.Text lines={3} w="90%" p={3} />
      </HStack>
    </Center>
  )
}
export default CommentLoader
