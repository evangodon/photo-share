import { Photo as PhotoType, Album as AlbumType } from '@/graphql/generated';

export type NewPhoto = Pick<PhotoType, 'id' | 'url'>;
export type Photo = Pick<PhotoType, 'id' | '_id' | 'url'>;

export type PhotoTable = { [photoID: string]: Photo | NewPhoto };

export type Album = Pick<
  AlbumType,
  '_id' | 'title' | 'coverPhoto' | 'photoOrder' | 'photos'
>;

export type EditedAlbum = Pick<
  AlbumType,
  '_id' | 'title' | 'coverPhoto' | 'photoOrder'
> & {
  photos: { data: PhotoTable };
};
