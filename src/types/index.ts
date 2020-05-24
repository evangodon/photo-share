import { Photo as PhotoType, Album as AlbumType } from '@/graphql/generated';

export type Photo = Pick<PhotoType, 'url'>;

export type Album = Pick<AlbumType, '_id' | 'title' | 'coverPhoto' | 'photos'>;
