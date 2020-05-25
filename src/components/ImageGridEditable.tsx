import styled from 'styled-components';
import { Image } from '@/components';
import { useMutation } from 'urql';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { DeletePhoto } from '@/graphql/queries';
import { arrayMove } from '@/utils/arrayMove';
import Options from '@/components/Options';

const SortablePhoto = SortableElement(({ photo, onDelete }) => (
  <DraggableImage key={photo._id}>
    <>
      <Image
        src={photo.url ?? `https://source.unsplash.com/random`}
        cursor="grab"
      />
      <PhotoOptions options={[{ label: 'Delete Photo', onClick: onDelete }]} />
    </>
  </DraggableImage>
));

const Gallery = SortableContainer(({ items: photos }) => {
  const [_, deletePhoto] = useMutation(DeletePhoto);

  return (
    <ImageContainer>
      {photos.map((photo, index) => (
        <SortablePhoto
          photo={photo}
          onDelete={() => deletePhoto({ id: photo._id })}
          index={index}
          key={photo._id}
        />
      ))}
      <span className="last-row" />
    </ImageContainer>
  );
});

/**
 * Renders photos in a grid which can be reordered.
 *
 * @TODO: handle delete of images that haven't been saved in Fauna
 */
const ImageGridEditable = ({ photos, setPhotos }) => {
  function onSortEnd({ oldIndex, newIndex }) {
    setPhotos(arrayMove(photos, oldIndex, newIndex));
  }

  return (
    <Gallery
      items={photos}
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
