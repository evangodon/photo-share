import styled from 'styled-components';
import ContentEditable from '@/components/ContentEditable';
import { space, shadows } from '@/css/theme';

export const Container = styled.figure`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 45.6rem;
  overflow: hidden;
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
  transition: box-shadow 0.2s ease-in, transform 0.2s ease-in;
  box-shadow: ${shadows[2]};

  &:hover {
    box-shadow: ${shadows[3]};
    transform: translateY(-2px);
  }
`;

export const AlbumOptions = styled.span`
  color: #fff;
  display: inline-flex;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0;
  border-bottom-left-radius: var(--border-radius);
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.__grey_600};
  transition: color, opacity 0.1s ease;
  --border: 1px solid ${(props) => props.theme.colors.__grey_300};
  border-right: var(--border);
  border-top: var(--border);
  border-top-right-radius: var(--border-radius);
  overflow: hidden;

  ${Container}:hover & {
    opacity: 1;
  }
`;

export const Edit = styled.a`
  display: flex;
  align-items: center;
  padding: ${space[3]};
  border-right: var(--border);

  &:hover {
    color: ${(props) => props.theme.colors.__grey_800};
    background-color: ${(props) => props.theme.colors.__grey_100};
  }
`;

export const Delete = styled.span`
  padding: ${space[3]};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${(props) => props.theme.colors.__color_red};
    background-color: ${(props) => props.theme.colors.__color_red_light};
  }
`;

export const AlbumCover = styled.div`
  height: 30rem;
  display: inline-block;
`;

export const AlbumCoverLink = styled(AlbumCover)`
  cursor: pointer;
`;

export const EditableHeader = styled(ContentEditable)`
  position: absolute;
  left: 2rem;
  bottom: 2rem;
  min-width: 2rem;

  &:focus {
  }
`;

export const ImageContainer = styled.div`
  height: 24rem;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.1);
    transition: background-color 0.2s ease;
  }

  ${Container}:hover &:before {
    background-color: transparent;
  }
`;
