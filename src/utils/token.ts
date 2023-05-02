import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

/**
 * Set token to localStorage - web or async store - android
 * @param {string} token
 * @returns {string} token
 */

export async function setToken(token: string) {
  if (Platform.OS === 'web') {
    // do something for ios
    await localStorage.setItem('access_token', token)
  } else if (Platform.OS === 'android') {
    // other thing for android
    await AsyncStorage.setItem('access_token', token)
  }

  return token
}

/**
 * Get token form localStorage - web or async store - android
 * @returns {string} token
 */
export async function getToken() {
  let token

  if (Platform.OS === 'web') {
    // do something for ios
    token = await localStorage.getItem('access_token')
  } else if (Platform.OS === 'android') {
    // other thing for android
    token = await AsyncStorage.getItem('access_token')
  }

  return token
}
