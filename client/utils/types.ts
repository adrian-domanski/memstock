export enum mediaCheckTypes {
  FOR_PUBLICATION,
  FOR_REPORT,
  NO_CHECK,
}

export interface UserType {
  confirmed: boolean;
  blocked: boolean;
  rank: number;
  _id: string;
  username: string;
  email: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  role: RoleType;
  mem: string;
  updated_by: string;
  avatar: AvatarType;
  id: string;
  mems: MemType[];
}

export interface AvatarType {
  _id: string;
  name: string;
  alternativeText: null;
  caption: null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  width: number;
  height: number;
  url: string;
  formats: Formats;
  provider: string;
  related: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface Formats {
  thumbnail: ThumbnailType;
}

export interface ThumbnailType {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: null;
  url: string;
}

export interface MemType {
  likes: number;
  dislikes: number;
  isPublic: boolean;
  isReported: boolean | null;
  categories: CategoryType[];
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  image: AvatarType;
  user: UserType;
  id: string;
}

export interface RoleType {
  _id: string;
  name: string;
  description: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface CategoryType {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  created_by: AtedBy;
  updated_by: AtedBy;
  mems: any[];
  id: string;
}

export interface AtedBy {
  _id: string;
  username: null;
  firstname: string;
  lastname: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface CommentType {
  _id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  created_by: AtedBy;
  mem: MemType;
  updated_by: AtedBy;
  user: UserType;
  id: string;
}

export interface MemGeneratorTemplate {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
}

export interface IWhereFilter {
  isPublic: boolean;
  title_contains?: string;
  categories?: { name: string };
}
