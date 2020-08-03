import { withPageLayout } from '@/components/layout';
import styled from 'styled-components';

const Login = () => {
  return <Container>sign in</Container>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default withPageLayout(Login);
