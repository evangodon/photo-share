import styled from 'styled-components';
import { Image } from '@/components';
import { useMutation } from 'urql';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Trash2 as TrashIcon } from 'react-feather';
import { DeletePhoto } from '@/graphql/queries';
import { Photo, EditedAlbum } from '@/types/index';
import { arrayMove } from '@/utils/arrayMove';
import { AlbumDispatch } from '@/hooks';
import { space, colors } from '@/css/theme';

const SortablePhoto = SortableElement(({ photo, deletePhoto }) => (
  <DraggableImage key={photo.id}>
    <>
      <Image src={photo.url} cursor="grab" />

      <PhotoOptions onClick={deletePhoto}>
        <TrashIcon />
      </PhotoOptions>
    </>
  </DraggableImage>
));

const Gallery = SortableContainer(({ items: photos, onDeletePhoto }) => (
  <ImageContainer>
    {photos.map((photo, index) => (
      <SortablePhoto
        photo={photo}
        deletePhoto={() => onDeletePhoto(photo)}
        index={index}
        key={photo.id ?? photo._id}
      />
    ))}
    <span className="last-row" />
  </ImageContainer>
));

type Props = {
  album: EditedAlbum;
  albumDispatch: AlbumDispatch;
};

/**
 * Renders photos in a grid which can be reordered.
 *
 * @TODO: handle delete of images that haven't been saved in Fauna
 * @TODO: when deleting image, need to delete from photo order as well
 */
const ImageGridEditable = ({ album, albumDispatch }: Props) => {
  const [_, deletePhoto] = useMutation(DeletePhoto);

  function onSortEnd({ oldIndex, newIndex }) {
    const newOrder = arrayMove(album.photoOrder, oldIndex, newIndex);

    albumDispatch({ type: 'update:photo_order', payload: { order: newOrder } });
  }

  function handleDeletePhoto({ id, _id }: Photo) {
    deletePhoto({ id: _id }).then((result) => {
      albumDispatch({
        type: 'delete:photo',
        payload: { photoID: id },
      });
    });
  }

  const photos = album.photoOrder
    .map((photoID) => album.photos.data[photoID])
    .filter(Boolean);

  return (
    <Gallery
      items={photos}
      onDeletePhoto={handleDeletePhoto}
      onSortEnd={onSortEnd}
      helperClass="is-dragged"
      distance={1}
      axis="xy"
    />
  );
};

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;

  .last-row {
    flex-grow: 10;
  }
`;

const DraggableImage = styled.div`
  position: relative;
  height: 40vh;
  display: inline-flex;
  margin: 2px;
  flex-grow: 1;
  transition: transform;

  &.is-dragged {
    border: 2px solid ${colors.primary};
  }
`;

const PhotoOptions = styled.span`
  opacity: 0;
  position: absolute;
  top: ${space[3]};
  right: ${space[3]};
  background-color: rgba(0, 0, 0, 0.3);
  color: ${colors.__grey_200};
  --size: 4.5rem;
  height: var(--size);
  width: var(--size);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid currentColor;
  cursor: pointer;
  transition: opacity 0.2s ease;

  ${DraggableImage}:hover & {
    opacity: 1;
  }

  &:hover {
    color: ${colors.__color_red};
  }
`;

export default ImageGridEditable;
