import styled from 'styled-components';
import { Label, Input } from '@rebass/forms/styled-components';
import withPageLayout from '@/components/layout/withPageLayout';
import ImageUpload from '@/components/ImageUpload';
import { Button } from '@/components';

const Create = () => {
  function handleCreateAlbum() {}

  return (
    <>
      <Container>
        <form>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" type="text" />
          <Button onClick={handleCreateAlbum}>Create</Button>
        </form>
        <ImageUploadContainer>
          <ImageUpload />
        </ImageUploadContainer>
      </Container>
      <style global jsx>{`
        .filepond--item {
          width: calc(25% - 0.5rem);
        }

        .filepond--root {
          min-height: 100em;
        }
      `}</style>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    margin-bottom: 8rem;
  }
`;

const ImageUploadContainer = styled.div`
  width: 100%;
`;

export default withPageLayout(Create);
