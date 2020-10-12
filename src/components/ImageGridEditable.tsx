import styled from 'styled-components';
import { Image } from '@/components';
import { useMutation } from 'urql';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Trash2 as TrashIcon, Image as ImageIcon } from 'react-feather';
import { DeletePhoto } from '@/graphql/queries';
import { Photo, EditedAlbum } from '@/types/index';
import { arrayMove } from '@/utils/arrayMove';
import { AlbumDispatch } from '@/hooks';
import { space, colors } from '@/css/theme';
import { useToast } from '../hooks/useToast';

const SortablePhoto = SortableElement(({ photo, deletePhoto, updateCover }) => (
  <DraggableImage key={photo.id}>
    <>
      <Image src={photo.url} cursor="grab" options={{ height: 600 }} />
      <CoverIndicator isCover={photo.isCover} onClick={updateCover}>
        <ImageIcon />
        {photo.isCover ? '' : <span className="cover-text">Set Cover</span>}
      </CoverIndicator>

      <DeleteImage onClick={deletePhoto}>
        <TrashIcon size={16} />
      </DeleteImage>
    </>
  </DraggableImage>
));

const Gallery = SortableContainer(({ items: photos, onDeletePhoto, onUpdateCover }) => (
  <ImageContainer>
    {photos.map((photo, index) => (
      <SortablePhoto
        photo={photo}
        deletePhoto={() => onDeletePhoto(photo)}
        updateCover={() => onUpdateCover(photo.url)}
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
  const toast = useToast();

  function onSortEnd({ oldIndex, newIndex }) {
    const newOrder = arrayMove(album.photoOrder, oldIndex, newIndex);

    albumDispatch({ type: 'update:photo_order', payload: { order: newOrder } });
  }

  function handleDeletePhoto({ _id, photoId }: Photo) {
    deletePhoto({ id: _id }).then(() => {
      albumDispatch({
        type: 'delete:photo',
        payload: { photoId },
      });
      toast('Photo Deleted. 🗑️');
    });
  }

  function handleUpdateCover(url: string) {
    albumDispatch({
      type: 'update:cover_photo',
      payload: { url },
    });
  }

  const photos = album.photoOrder
    .map((photoId) => album.photos.data.find((photo) => photo.photoId === photoId))
    .filter(Boolean)
    .map((photo) => ({
      ...photo,
      isCover: photo?.url === album.coverPhoto,
    }));

  return (
    <Gallery
      items={photos}
      onDeletePhoto={handleDeletePhoto}
      onUpdateCover={handleUpdateCover}
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

const ImageOptions = styled.span`
  opacity: 0;
  position: absolute;
  top: ${space[3]};
  background-color: ${colors.white};
  border: 1px solid currentColor;
  border-radius: 4px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: opacity 0.2s ease;

  ${DraggableImage}:hover & {
    opacity: 1;
  }
`;

const DeleteImage = styled(ImageOptions)`
  right: ${space[3]};
  opacity: 0;
  color: ${colors.__grey_600};
  padding: ${space[2]};

  &:hover {
    color: ${colors.__color_red};
    background-color: ${colors.__color_red_light};
  }
`;

const CoverIndicator = styled(ImageOptions)<{ isCover: boolean }>`
  left: ${space[3]};
  color: ${(p) => (p.isCover ? colors.__grey_600 : colors.__grey_600)};
  padding: ${space[1]} ${space[1]};
  opacity: ${(p) => (p.isCover ? 1 : 0)};

  &:hover {
    color: ${colors.__grey_700};
  }

  .cover-text {
    margin-left: ${space[1]};
  }
`;

export default ImageGridEditable;
