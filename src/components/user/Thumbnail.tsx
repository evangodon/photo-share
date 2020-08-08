import styled from 'styled-components';
import { signout } from 'next-auth/client';
import { shimmer } from '@/css/animations';
import { Options } from '@/components/interaction';
import { User } from '@/types';

interface Thumbnail {
  ({ user }: { user: User; signout: () => void }): JSX.Element;
  ({ loading }: { loading: boolean }): JSX.Element;
}

const Thumbnail: Thumbnail = ({ user, loading, signout }) => {
  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  return (
    <>
      <Container>
        <UserOptions
          options={[
            {
              label: 'Logout',
              onClick: signout,
            },
          ]}
        />
        <Img src={user.image} />
      </Container>
    </>
  );
};

const size = '5rem';

const Container = styled.div`
  height: ${size};
  width: ${size};
  position: relative;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.__grey_400};
`;

const Img = styled.img`
  max-width: 100%;
  border-radius: 50%;
  pointer-events: none;
  border: 3px solid ${(props) => props.theme.colors.primary};
`;

const Loading = styled.span`
  display: inline-block;
  height: ${size};
  width: ${size};
  transform: translateX(-100%);
  background-image: linear-gradient(
    90deg,
    rgba(#fff, 0) 0,
    rgba(#fff, 0.2) 20%,
    rgba(#fff, 0.5) 60%,
    rgba(#fff, 0)
  );
  animation: ${shimmer} 2s infinite;
`;

const UserOptions = styled(Options)`
  right: 0;
  top: 0;
  opacity: 0;
`;

export default Thumbnail;
