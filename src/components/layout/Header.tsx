import styled from 'styled-components';
import Link from 'next/link';

const Header = () => {
  return (
    <Container>
      <Content>
        <Link href="/">
          <a>
            <H1>Photo Share</H1>
          </a>
        </Link>
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
