import styled from 'styled-components';
import { transformImage } from '@/utils/transformImage';

type Props = {
  src: string;
};

const Image = ({ src }: Props) => {
  const transformedSrc = transformImage(src, { height: 600 });

  return <Container src={transformedSrc} />;
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
