import { Photo, PhotoTable } from '@/types';

type CreatePhotoTable = (photos: Photo[]) => { [photoId: string]: Photo };

export const createPhotoTable: CreatePhotoTable = (photos) => {
  return photos.reduce((acc, photo) => {
    acc[photo.id] = photo;

    return acc;
  }, {});
};

type CreatePhotoList = (photoTable: PhotoTable) => Omit<Photo, '_id'>[];

export const createPhotoList: CreatePhotoList = (photoTable) => {
  return Object.keys(photoTable)
    .map((photoID) => photoTable[photoID])
    .map((photo) => ({ id: photo.id, url: photo.url }));
};
