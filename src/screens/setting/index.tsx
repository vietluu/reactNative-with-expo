import { useEffect, useState } from 'react'
import { Text, HStack, Avatar, Box, Button, useToast, ScrollView } from 'native-base'
import Icon from '@expo/vector-icons/Ionicons'
import { clearToken } from '../../utils'
import { useAppSelector } from '../../redux'
import { profile } from '../../redux/profile/reducer'
import { get } from 'lodash'
import AvatarEntity from '../../components/common/AvatarEntity'

const Setting = ({ navigation }: any) => {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const user: any = useAppSelector(profile)

  //hanleSignout
  const hanleSignout = () => {
    setLoading(true)
    // need to remove current user state
    setTimeout(async () => {
      await clearToken()
      setLoading(false)
      toast.show({
        title: 'Sign out success',
        placement: 'top',
      })
      navigation.navigate('SignInScreen')
    }, 1000)
  }

  return (
    <ScrollView w="full" h="full">
      <Box width="full" bg="#644AB5" minHeight={240}>
        <HStack justifyContent="center" display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <Text fontSize={30} fontWeight="bold" marginTop={5}>
            {get(user, 'name')}
          </Text>
          <AvatarEntity
            marginTop={5}
            size="2xl"
            username={get(user, 'name')}
            isTextAvatar={true}
            justifyContent={'center'}
          />
        </HStack>
      </Box>

      <Box
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        width="90%"
        bg="#fff"
        p="5"
        ml="5"
        rounded="xl"
      >
        <Icon name="ios-location-outline" size={22} color="#000" />
        <Text color="#000" ml="5">
          Hanoi
        </Text>
      </Box>

      <Box
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        width="90%"
        bg="#fff"
        p="5"
        ml="5"
        rounded="xl"
      >
        <Icon name="settings-outline" size={22} color="#000" />
        <Text color="#000" ml="5">
          Setting
        </Text>
      </Box>

      <Button
        leftIcon={<Icon name="ios-log-out-outline" size={24} color="#fff" />}
        justifyContent="center"
        alignItems="center"
        width="90%"
        bg="#644AB5"
        py="5"
        ml="5"
        rounded="xl"
        onPress={hanleSignout}
        isLoading={loading}
        isLoadingText="Signing out"
      >
        Sign Out
      </Button>
    </ScrollView>
  )
}
export default Setting
