import { useReducer, Dispatch } from 'react';
import { EditedAlbum, NewPhoto } from '@/types/index';
import { getPhotoIdFromUrl } from '@/utils/photoData';

const initialState: EditedAlbum = {
  _id: '-1',
  title: '',
  coverPhoto: '',
  photoOrder: [],
  photos: { data: [] },
};
type Action =
  | { type: 'update:title'; payload: { title: string } }
  | { type: 'update:cover_photo'; payload: { url: string } }
  | { type: 'update:photo_order'; payload: { order: string[] } }
  | {
      type: 'create:photo';
      payload: {
        photo: NewPhoto & { postedBy: { connect: string } };
      };
    }
  | { type: 'delete:photo'; payload: { photoID: string } };

type Reducer = (state: EditedAlbum, action: Action) => EditedAlbum;

const reducer: Reducer = (state, action) => {
  switch (action.type) {
    case 'update:title':
      return { ...state, title: action.payload.title };

    case 'update:cover_photo':
      return { ...state, coverPhoto: action.payload.url };

    case 'update:photo_order':
      return { ...state, photoOrder: action.payload.order };

    case 'create:photo':
      const photoId = getPhotoIdFromUrl(action.payload.photo.url);
      return {
        ...state,
        photos: {
          data: [...state.photos.data, action.payload.photo],
        },
        photoOrder: [...state.photoOrder, photoId],
      };
    case 'delete:photo':
      delete state.photos.data[action.payload.photoID];
      return {
        ...state,
        photoOrder: state.photoOrder.filter(
          (photoID) => photoID !== action.payload.photoID
        ),
      };

    default:
      return state;
  }
};

export type AlbumDispatch = Dispatch<Action>;

/**
 * Hook for holding state related to creating and editing an album.
 *
 * @param initialAlbum
 */
export const useAlbumReducer = (initialAlbum: EditedAlbum = initialState) => {
  const [album, albumDispatch] = useReducer(reducer, initialAlbum);

  return { album, albumDispatch } as const;
};
