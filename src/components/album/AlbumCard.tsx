import { useRef } from 'react';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import { Edit as EditIcon, Trash2 as TrashIcon } from 'react-feather';
import Link from 'next/link';
import { Flex } from 'rebass';
import { useMutation } from 'urql';
import { Album } from '@/graphql/generated';
import { DeleteAlbum } from '@/graphql/queries';
import Image from '@/components/Image';
import ContentEditable, { ContentEditableEvent } from '@/components/ContentEditable';
import { createSlug } from '@/utils';
import { AlbumDispatch } from '@/hooks';
import { H3 } from '@/components/typography';
import { User } from '@/types/index';
import {
  AnimatedContainer,
  AlbumCover,
  AlbumCoverLink,
  AlbumOptions,
  ImageContainer,
  Edit,
  Delete,
} from './AlbumCard.styles';

type Props = {
  album: Pick<Album, 'title' | '_id' | 'coverPhoto'>;
  editable?: boolean;
  albumDispatch?: AlbumDispatch;
  handleInput?: (title: string) => void;
  user?: User;
};

/**
 * Shows an album cover and title
 *
 * @todo: Add focus style to editable title
 */
export const AlbumCard = ({ album, editable, albumDispatch, user }: Props) => {
  const router = useRouter();
  const [_data, deleteAlbum] = useMutation(DeleteAlbum);

  function handleDeleteAlbum(id: string) {
    return () =>
      deleteAlbum({ id })
        .then((result) => {
          console.log(result);
          // Delete from state
        })
        .catch((error) => console.error(error));
  }

  return (
    <AnimatedContainer>
      <Link href={'/album/[album-slug]'} as={`/album/${album.title}-${album._id}`}>
        <AlbumCoverLink as="a">
          <ImageContainer>
            <Image src={album.coverPhoto} />
          </ImageContainer>
          <Flex alignItems="center" p={3}>
            <H3>{album.title}</H3>
          </Flex>
        </AlbumCoverLink>
      </Link>
      {user?.isSuperUser && (
        <AlbumOptions onClick={(e) => e.stopPropagation()}>
          <Link href="/album/[album-slug]/edit" as={`/album/${createSlug(album)}/edit`}>
            <Edit>
              <EditIcon size={18} />
            </Edit>
          </Link>
          <Delete onClick={handleDeleteAlbum(album._id)}>
            <TrashIcon size={18} />
          </Delete>
        </AlbumOptions>
      )}
    </AnimatedContainer>
  );
};
