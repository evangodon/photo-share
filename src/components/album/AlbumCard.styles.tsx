import styled from 'styled-components';
import { space, shadows, fontSize, colors } from '@/css/theme';

export const Container = styled.figure`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 45.6rem;
  overflow: hidden;
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
  box-shadow: ${shadows[2]};
`;

export const AnimatedContainer = styled(Container)`
  transition: box-shadow 0.2s ease-in, transform 0.2s ease-in;
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
  cursor: pointer;

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

export const CoverImagePlaceholder = styled.div`
  height: 100%;
  background-color: ${(props) => props.theme.colors.__grey_200};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.__grey_500};
`;

export const EditableHeader = styled.input`
  font-weight: 400;
  border: 0;
  font-size: ${fontSize.__fs_large};

  outline: 0;
`;

export const HelpItem = styled.span<{
  isActive?: boolean;
  flexDirection?: 'row' | 'column';
}>`
  margin: 0 ${space[3]};
  color: ${(props) => (props.isActive ? colors.__grey_800 : colors.__grey_600)};
  display: inline-flex;
  align-items: center;
  max-width: 20rem;
  flex-direction: ${(props) => props.flexDirection ?? 'row'};
  text-align: ${(props) => (props.flexDirection === 'column' ? 'center' : 'left')};

  svg {
    margin-right: ${space[1]};
    margin-bottom: ${(props) => (props.flexDirection === 'column' ? space[1] : 0)};
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

  ${Container}:not(${AnimatedContainer}) &:before {
    background-color: transparent;
  }

  ${AnimatedContainer}:hover &:before {
    background-color: transparent;
  }
`;
