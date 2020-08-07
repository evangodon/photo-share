import styled from 'styled-components';
import Link from 'next/link';
import { useSession, signin } from 'next-auth/client';
import { H1 } from '@/components/typography';
import { Button } from '@/components/interaction';
import { Thumbnail } from '@/components/user';
import Logo from '@/components/Logo';
import { space } from '@/css/theme';

type AuthStatus = 'loading' | 'logged-in' | 'logged-out' | 'error';

type Props = {
  authProviders: any;
};

/**
 *
 * Clean up auth states
 */
const Header = ({ authProviders }: Props) => {
  const [session, loading] = useSession();
  const authStatus: AuthStatus = loading
    ? 'loading'
    : session
    ? 'logged-in'
    : 'logged-out';

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
            ['logged-in']: <Thumbnail user={session?.user} />,
            ['logged-out']: <Button onClick={() => signin('google')}>Login</Button>,
          }[authStatus]
        }
      </Content>
    </Container>
  );
};

const Container = styled.header`
  padding: 2.4rem;
  margin-bottom: 7rem;
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

  svg {
    margin-right: ${space[3]};
  }
`;

export default Header;
