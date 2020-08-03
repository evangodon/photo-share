import styled from 'styled-components';
import Link from 'next/link';
import Button from '@/components/Button';
import { useSession, signin, signout, providers } from 'next-auth/client';
import { Thumbnail } from '@/components/user';

type AuthStatus = 'loading' | 'loggedIn' | 'loggedOut';

type Props = {
  authProviders: any;
};

const Header = ({ authProviders }: Props) => {
  const [session, loading] = useSession();

  console.log({ session });
  const authStatus: AuthStatus = loading
    ? 'loading'
    : session
    ? 'loggedIn'
    : 'loggedOut';

  return (
    <Container>
      <Content>
        <Link href="/">
          <a>
            <H1>Photo Share</H1>
          </a>
        </Link>
        {
          {
            loading: <Thumbnail loading />,
            loggedIn: <Thumbnail user={session?.user} />,
            loggedOut: (
              <Button onClick={() => signin(authProviders.google.id)}>
                Login
              </Button>
            ),
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

const H1 = styled.h1`
  font-size: var(--fs-large);
`;

export default Header;
