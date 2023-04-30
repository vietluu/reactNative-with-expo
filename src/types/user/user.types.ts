export interface User {
  username?: string
  avatar?: string
  email?: string
}

export interface UserSignIn {
  email: string
  password: string
}

export interface UserSignUp {
  email: string
  password: string
}
