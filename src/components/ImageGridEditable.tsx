import styled from 'styled-components';
import { Image } from '@/components';
import { useMutation } from 'urql';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { DeletePhoto } from '@/graphql/queries';
import { Photo, EditedAlbum } from '@/types/index';
import { arrayMove } from '@/utils/arrayMove';
import { Options } from '@/components/interaction';
import { AlbumDispatch } from '@/hooks';

const SortablePhoto = SortableElement(({ photo, onDelete }) => (
  <DraggableImage key={photo.id}>
    <>
      <Image src={photo.url} cursor="grab" />
      <PhotoOptions options={[{ label: 'Delete Photo', onClick: onDelete }]} />
    </>
  </DraggableImage>
));

const Gallery = SortableContainer(({ items: photos, onDeletePhoto }) => (
  <ImageContainer>
    {photos.map((photo, index) => (
      <SortablePhoto
        photo={photo}
        onDelete={() => onDeletePhoto(photo)}
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

  const photos = album.photoOrder.map((photoID) => album.photos.data[photoID]);

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

const PhotoOptions = styled(Options)`
  opacity: 0;
`;

const DraggableImage = styled.div`
  position: relative;
  height: 40vh;
  display: inline-flex;
  margin: 2px;
  flex-grow: 1;
  transition: transform;

  &:hover ${PhotoOptions} {
    opacity: 1;
  }
`;

export default ImageGridEditable;
