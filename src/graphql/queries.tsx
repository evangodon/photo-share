export const FindAlbumById = /* GraphQL */ `
  query FindAlbumByID($albumId: ID!) {
    findAlbumByID(id: $albumId) {
      title
      coverPhoto
      photoOrder
      photos(_size: 80) {
        data {
          photoId
          _id
          url
          postedBy {
            _id
          }
        }
      }
    }
  }
`;

export const FindAlbumPhotos = /* GraphQL */ `
  query FindAlbumPhotos($albumId: ID!) {
    findAlbumByID(id: $albumId) {
      photoOrder
      photos(_size: 80) {
        data {
          photoId
          _id
          url
        }
      }
    }
  }
`;

export const FindPhotoById = /* GraphQL */ `
  query FindPhotoByID($photoId: ID!) {
    findPhotoByID(id: $photoId) {
      _id
      url
      postedBy {
        _id
      }
      album {
        _id
        title
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

export const DeleteAlbum = /* GraphQL */ `
  mutation DeleteAlbum($id: ID!) {
    deleteAlbum(id: $id) {
      _id
    }
  }
`;
