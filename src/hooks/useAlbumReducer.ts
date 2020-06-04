import { useReducer, Dispatch } from 'react';
import { EditedAlbum, Photo } from '@/types/index';
import { nanoid } from 'nanoid';

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
  | { type: 'create:photo'; payload: { photo: Photo } };

const reducer = (state, action: Action) => {
  switch (action.type) {
    case 'update:title':
      return { ...state, title: action.payload.title };

    case 'update:cover_photo':
      return { ...state, coverPhoto: action.payload.url };

    case 'update:photo_order':
      return { ...state, photoOrder: action.payload.order };

    case 'create:photo':
      return {
        ...state,
        photos: { data: [...state.photos.data, action.payload.photo] },
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
