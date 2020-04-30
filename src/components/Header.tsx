import styled from 'styled-components';

const Header = () => {
  return (
    <Container>
      <Content>
        <H1>Photo Share</H1>
      </Content>
    </Container>
  );
};

const Container = styled.header`
  padding: 3rem;
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

const H1 = styled.h1``;

export default Header;
