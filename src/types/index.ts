import { Photo as PhotoType, Album as AlbumType } from '@/graphql/generated';

export type NewPhoto = Pick<PhotoType, 'url'>;
export type Photo = Pick<PhotoType, 'photoId' | '_id' | 'url'> & {
  postedBy: Pick<User, '_id'>;
};

export type PhotoDictionary = { [photoID: string]: Photo };

export type Album = Pick<
  AlbumType,
  '_id' | 'title' | 'coverPhoto' | 'photoOrder' | 'photos'
>;

export type EditedAlbum = Pick<
  AlbumType,
  '_id' | 'title' | 'coverPhoto' | 'photoOrder'
> & {
  photos: { data: PhotoType[] | NewPhoto[] };
};

export type User = {
  _id: string;
  name: string;
  email: string;
  image?: string;
  isSuperUser: boolean;
};
