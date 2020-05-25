import styled from 'styled-components';
import { transformImage } from '@/utils/transformImage';

type CursorTypes = 'pointer' | 'grab';

type Props = {
  src: string;
  cursor?: CursorTypes;
};

const Image = ({ src, cursor }: Props) => {
  const transformedSrc = transformImage(src, { height: 600 });

  return <Container src={transformedSrc} cursor={cursor} />;
};

const Container = styled.img<{ cursor: CursorTypes }>`
  min-width: 100%;
  max-width: 100%;
  max-height: 100%;
  min-height: 100%;
  object-fit: cover;
  vertical-align: bottom;
  max-width: 45rem;
  cursor: ${(props) => props.cursor ?? 'default'};
`;

export default Image;
