import { Photo as PhotoType, Album as AlbumType } from '@/graphql/generated';

export type Photo = Pick<PhotoType, 'id' | 'url'>;

export type Album = Pick<
  AlbumType,
  '_id' | 'title' | 'coverPhoto' | 'photoOrder' | 'photos'
>;

export type EditedAlbum = Pick<
  AlbumType,
  '_id' | 'title' | 'coverPhoto' | 'photoOrder'
> & {
  photos: { data: Photo[] };
};
