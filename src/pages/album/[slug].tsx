import styled from 'styled-components';
import Image from '@components/Image';

const photos = new Array(10).fill('hello');

const AlbumPage = () => {
  return (
    <>
      <h1>Pictures</h1>
      <ImageContainer>
        {photos.map((img, index) => (
          <Image
            key={index}
            src={`https://source.unsplash.com/random?${index}`}
          />
        ))}
      </ImageContainer>
    </>
  );
};

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default AlbumPage;
