import styled from 'styled-components';
import { Label, Input } from '@rebass/forms/styled-components';
import withPageLayout from '@/components/layout/withPageLayout';

const Create = () => {
  return (
    <Container>
      <form>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" type="text" />
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export default withPageLayout(Create);
