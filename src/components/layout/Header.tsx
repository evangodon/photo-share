import styled from 'styled-components';
import Link from 'next/link';
import { useSession, signin } from 'next-auth/client';
import { useAuthContext } from '@/context/authContext';
import { H1 } from '@/components/typography';
import { Button } from '@/components/interactive';
import { Thumbnail } from '@/components/user';
import Logo from '@/components/Logo';
import { space } from '@/css/theme';

type AuthStatus = 'loading' | 'logged-in' | 'logged-out' | 'error';

type Props = {};

/**
 *
 * Clean up auth states
 */
const Header = ({}: Props) => {
  const { user, loading, signout } = useAuthContext();
  const authStatus: AuthStatus = loading ? 'loading' : user ? 'logged-in' : 'logged-out';

  return (
    <Container>
      <Content>
        <Link href="/">
          <LogoContainer>
            <Logo />
            <H1>Photo Share</H1>
          </LogoContainer>
        </Link>
        {
          {
            loading: <Thumbnail loading />,
            ['logged-in']: <Thumbnail user={user} signout={signout} />,
            ['logged-out']: <Button onClick={() => signin('google')}>Login</Button>,
          }[authStatus]
        }
      </Content>
    </Container>
  );
};

const Container = styled.header`
  min-height: 8rem;
  padding: 1.8rem;
  margin-bottom: 6rem;
  position: relative;
  border-bottom: 1px solid var(--grey-300);
`;

const Content = styled.div`
  max-width: var(--app-max-width);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoContainer = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    margin-right: ${space[3]};
  }
`;

export default Header;
