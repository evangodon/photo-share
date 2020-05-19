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
