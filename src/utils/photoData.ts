import { Photo, User } from '@/types';

export const getPhotoIdFromUrl = (url: string) => {
  return url.split('/').pop().replace(/\.jpg/, '');
};
