import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Flex } from 'rebass';
import { ArrowLeft as ArrowLeftIcon } from 'react-feather';
import { useMutation } from 'urql';
import { useAuthContext } from '@/context';
import { withPageLayout } from '@/components/layout';
import { H2 } from '@/components/typography';
import { Button } from '@/components/interaction';
import { AlbumTabs } from '@/components/album';
import { getPhotoIdFromUrl } from '@/utils/photoData';
import { useAlbumReducer, useToast } from '@/hooks';
import { CreateAlbumMutation } from '@/graphql/generated';

const CreateAlbum = /* GraphQL */ `
  mutation CreateAlbum(
    $title: String!
    $coverPhoto: String
    $photoOrder: [String]!
    $photos: [PhotoInput!]!
  ) {
    createAlbum(
      data: {
        title: $title
        coverPhoto: $coverPhoto
        photoOrder: $photoOrder
        photos: { create: $photos }
      }
    ) {
      _id
    }
  }
`;

/**
 * Page for creating an album.
 *
 * @todo: Make intuitive on how to change title
 * @todo: Generate mutation hook with codegen
 * @todo: Handle successful create
 * @todo: Handle error during create
 * @todo: Persist photos that were just uploaded
 */
const Create = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const [_, createAlbum] = useMutation<CreateAlbumMutation>(CreateAlbum);
  const { album, albumDispatch } = useAlbumReducer();
  const toast = useToast();

  useEffect(() => {
    const photos = album.photos.data;

    if (!album.coverPhoto && photos.length > 0) {
      albumDispatch({
        type: 'update:cover_photo',
        payload: { url: photos[0].url },
      });
    }
  }, [album.photos.data]);

  function handleCreateAlbum() {
    const { title, coverPhoto, photoOrder, photos } = album;
    const variables = {
      title,
      coverPhoto,
      photoOrder,
      photos: photos.data,
    };

    createAlbum(variables).then((result) => {
      if (result.error) {
        console.error(result.error);
      }

      toast('Your new album has been created! 🎉');
      router.push('/');
    });
  }

  const handlePhotoUpload = (url: string) => {
    const photoId = getPhotoIdFromUrl(url);
    const photo = { url, photoId, postedBy: { connect: user._id } };
    albumDispatch({ type: 'create:photo', payload: { photo } });
  };

  return (
    <>
      <Container>
        <Flex mb={50} width="100%" justifyContent="space-between" alignItems="center">
          <Flex width={200} alignItems="center">
            <Link href="/" passHref>
              <Button>
                <ArrowLeftIcon size={15} />
                Back
              </Button>
            </Link>
          </Flex>
          <H2>Create an album</H2>
          <Flex width={200} justifyContent="flex-end">
            <Button variant="contained" onClick={handleCreateAlbum}>
              Create
            </Button>
          </Flex>
        </Flex>
        <AlbumTabs
          mode="create"
          handlePhotoUpload={handlePhotoUpload}
          albumDispatch={albumDispatch}
          album={album}
        />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default withPageLayout(Create);
