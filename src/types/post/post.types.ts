import { User } from '../user';
export default interface Post {
  user?: User;
  content?: string;
  image?: string;
  react?: boolean;
}
