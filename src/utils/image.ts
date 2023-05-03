import { API_URL } from '@env'
import { IMedia } from '../types/media/media.types'

export function getImage(media: IMedia): string | null {
  if (!media) return null
  const path = media.path || 'https://wallpaperaccess.com/full/317501.jpg'

  return `${API_URL}/media/${path}`
}
