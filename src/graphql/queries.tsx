export const FindAlbumById = /* GraphQL */ `
  query FindAlbumByID($albumID: ID!) {
    findAlbumByID(id: $albumID) {
      title
      coverPhoto
      photos {
        data {
          _id
          url
        }
      }
    }
  }
`;

export const DeletePhoto = /* GraphQL */ `
  mutation DeletePhoto($id: ID!) {
    deletePhoto(id: $id) {
      _id
    }
  }
`;
