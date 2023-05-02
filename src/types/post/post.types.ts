import { ICategory } from '../category'
import { IMedia } from '../media/media.types'
import { User } from '../user'
export interface Post {
  user?: User
  content?: string
  image?: string
  react?: boolean
}

export interface ICreatePost {
  name: string
  content: string
  medias?: IMedia[]
  category?: ICategory
}
