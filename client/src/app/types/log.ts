import { User } from './user';

export interface Log {
  name: string;
  date: string;
  description: string;
  img: File;
  location: string;
  _id?: string;
  _ownerId: User;
  created_at: string;
  updatedAt: string;
  __v: number;
}