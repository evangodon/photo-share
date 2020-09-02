import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'urql';
import { FindAlbumPhotos } from '@/graphql/queries';
import { FindAlbumPhotosQuery } from '@/graphql/generated';

type Photo = { _id: string; url: string; album: { _id } };

export const useAlbumPhotosOrder = (photo: Photo) => {
  const router = useRouter();
  const photoId = router.query['photo-id'];
  const [photoOrder, setPhotoOrder] = useState<any[]>([]);
  const [{ prevPhotoId, nextPhotoId }, setSiblingIds] = useState({
    prevPhotoId: null,
    nextPhotoId: null,
  });
  const [currentPhoto, setCurrentPhoto] = useState<{ url: string; _id: string }>(null);

  const albumId = photo?.album?._id;

  const [result] = useQuery<FindAlbumPhotosQuery>({
    query: FindAlbumPhotos,
    variables: { albumId },
    pause: !albumId,
  });

  /* Set the first photo */
  useEffect(() => {
    if (photo) {
      setCurrentPhoto(photo);
    }
  }, [photo]);

  useEffect(() => {
    if (result.data) {
      const { photoOrder, photos } = result.data.findAlbumByID;
      const order = photoOrder.map((photoId) =>
        photos.data.find((photo) => photo.photoId === photoId)
      );

      setPhotoOrder(order);
      const currentIndex = order.findIndex((photo) => photo._id === photoId);
      setSiblingIds({
        prevPhotoId: order[currentIndex - 1]?._id,
        nextPhotoId: order[currentIndex + 1]?._id,
      });
    }
  }, [result]);

  useEffect(() => {
    if (photoOrder) {
      const currentIndex = photoOrder.findIndex((photo) => photo._id === photoId);

      setSiblingIds({
        prevPhotoId: photoOrder[currentIndex - 1]?._id,
        nextPhotoId: photoOrder[currentIndex + 1]?._id,
      });
      setCurrentPhoto(photoOrder[currentIndex]);
    }
  }, [photoId, photoOrder]);

  return {
    prevPhotoId,
    currentPhoto,
    nextPhotoId,
    photoOrder,
  } as const;
};
