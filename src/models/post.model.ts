interface Owner {
  id: number;
  firstName: string;
  lastName: string;
  picture: string;
}

export interface Post {
  id: string;
  image: string;
  likes: number;
  owner: Owner;
  text: string;
  tags: string[];
}

export interface PostComment {
  id: string;
  message: string;
  owner: Owner;
  post: string;
  publishDate: string;
}