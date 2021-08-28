import styled from 'styled-components';
import Img from 'react-cool-img';
import { transformImage } from '@/utils/transformImage';

type Props = {
  src: string;
  cursor?: 'pointer' | 'grab';
  options: {
    height?: number;
    width?: number;
  };
  className?: string;
};

/**
 *
 * @param cursor - change cursor when hovering
 *
 * @todo: Optimize for mobile
 */
const Image = ({ src, cursor, options = { height: 600 }, className }: Props) => {
  const transformedSrc = transformImage(src, {
    height: options.height,
    width: options.width,
    quality: 'best',
  });
  const placeholderImage = transformImage(src, {
    blur: 900,
    height: options.height,
    quality: 'low',
  });

  return (
    <Container
      placeholder={placeholderImage}
      src={transformedSrc}
      className={className}
      cursor={cursor}
    />
  );
};

const Container = styled(Img)<{ cursor: Props['cursor'] }>`
  min-width: 100%;
  max-width: 100%;
  max-height: 100%;
  min-height: 100%;
  object-fit: cover;
  vertical-align: bottom;
  cursor: ${(props) => props.cursor ?? 'default'};
`;

export default Image;
