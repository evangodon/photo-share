import styled from 'styled-components';
import Link from 'next/link';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Image } from '@/components';
import { Flex } from 'rebass';
import { arrayMove } from '@/utils/arrayMove';

type Props = {
  photos: any[];
  setPhotos?: any;
  editable?: boolean;
};

const SortablePhoto = SortableElement((photo) => (
  <div key={photo._id}>
    <Image
      src={photo.url ?? `https://source.unsplash.com/random`}
      cursor="grab"
    />
  </div>
));

const Gallery = SortableContainer(({ items: photos }) => (
  <ImageContainer>
    {photos.map((photo, index) => (
      <SortablePhoto {...photo} index={index} key={photo._id} />
    ))}
    <span className="last-row" />
  </ImageContainer>
));

const ImageGrid = ({ photos, setPhotos, editable }: Props) => {
  if (photos.length === 0) {
    return <Flex justifyContent="center">No photos yet!</Flex>;
  }

  const photosWithLinks = (photo) => (
    <Link href="/photo/photo-slug" key={photo._id}>
      <a>
        <Image src={photo.url ?? `https://source.unsplash.com/random`} />
      </a>
    </Link>
  );

  function onSortEnd({ oldIndex, newIndex }) {
    setPhotos(arrayMove(photos, oldIndex, newIndex));
  }

  return editable ? (
    <Gallery
      items={photos}
      onSortEnd={onSortEnd}
      helperClass="is-dragged"
      axis="xy"
    />
  ) : (
    <ImageContainer>
      <>
        {photos.map(photosWithLinks)}
        <span className="last-row" />
      </>
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;

  a,
  div {
    height: 40vh;
    display: inline-flex;
    margin: 2px;
    flex-grow: 1;
    transition: transform;
  }

  .last-row {
    flex-grow: 10;
  }
`;

export default ImageGrid;
