import styled from 'styled-components';

type Props = {
  src: string;
};

const Image = ({ src }: Props) => {
  return <Container src={src} />;
};

const Container = styled.img`
  min-width: 100%;
  max-width: 100%;
  max-height: 100%;
  min-height: 100%;
  object-fit: cover;
  vertical-align: bottom;
`;

export default Image;
