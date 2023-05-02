import { User } from '../user'

export interface IMedia {
  id?: any
  name?: string
  path?: string
  mimetype?: string
  type?: string
  size?: number
  created_by_id?: number
  created_by?: User
  created_at?: Date | string
  updated_at?: Date | string
}
