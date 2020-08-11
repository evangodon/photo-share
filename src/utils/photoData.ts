import { Photo, PhotoDictionary, User } from '@/types';

type CreatePhotoTable = (photos: Photo[]) => { [photoId: string]: Photo };

export const createPhotoDictionary: CreatePhotoTable = (photos) => {
  return photos.reduce((acc, photo) => {
    acc[photo.id] = photo;

    return acc;
  }, {});
};

type CreatePhotoList = (photoTable: {
  [photoID: string]: {
    id: string;
    _id?: string;
    url: string;
    postedBy?: Pick<User, '_id'>;
  };
}) => Omit<Photo, '_id'>[];

export const createPhotoList = (photoDictionary) => {
  return Object.keys(photoDictionary)
    .map((photoID) => photoDictionary[photoID])
    .map((photo) => ({
      id: photo.id,
      url: photo.url,
      postedBy: { connect: photo.postedBy._id },
    }));
};
