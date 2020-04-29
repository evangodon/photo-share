export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Time: any;
  /** The `Long` scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: any;
};

/** 'Album' input values */
export type AlbumInput = {
  title: Scalars['String'];
  coverPhoto?: Maybe<Scalars['String']>;
  photos?: Maybe<AlbumPhotosRelation>;
};

/** Allow manipulating the relationship between the types 'Album' and 'Photo'. */
export type AlbumPhotosRelation = {
  /** Create one or more documents of type 'Photo' and associate them with the current document. */
  create?: Maybe<Array<Maybe<PhotoInput>>>;
  /** Connect one or more documents of type 'Photo' with the current document using their IDs. */
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Disconnect the given documents of type 'Photo' from the current document using their IDs. */
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>;
};


export type Mutation = {
   __typename?: 'Mutation';
  /** Delete an existing document in the collection of 'Photo' */
  deletePhoto?: Maybe<Photo>;
  /** Update an existing document in the collection of 'Album' */
  updateAlbum?: Maybe<Album>;
  /** Create a new document in the collection of 'Album' */
  createAlbum: Album;
  /** Delete an existing document in the collection of 'Album' */
  deleteAlbum?: Maybe<Album>;
  /** Update an existing document in the collection of 'Photo' */
  updatePhoto?: Maybe<Photo>;
  /** Create a new document in the collection of 'Photo' */
  createPhoto: Photo;
};


export type MutationDeletePhotoArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateAlbumArgs = {
  id: Scalars['ID'];
  data: AlbumInput;
};


export type MutationCreateAlbumArgs = {
  data: AlbumInput;
};


export type MutationDeleteAlbumArgs = {
  id: Scalars['ID'];
};


export type MutationUpdatePhotoArgs = {
  id: Scalars['ID'];
  data: PhotoInput;
};


export type MutationCreatePhotoArgs = {
  data: PhotoInput;
};

/** Allow manipulating the relationship between the types 'Photo' and 'Album' using the field 'Photo.album'. */
export type PhotoAlbumRelation = {
  /** Create a document of type 'Album' and associate it with the current document. */
  create?: Maybe<AlbumInput>;
  /** Connect a document of type 'Album' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>;
};

/** 'Photo' input values */
export type PhotoInput = {
  title?: Maybe<Scalars['String']>;
  url: Scalars['String'];
  album?: Maybe<PhotoAlbumRelation>;
};


export type Album = {
   __typename?: 'Album';
  /** The document's ID. */
  _id: Scalars['ID'];
  coverPhoto?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  photos: PhotoPage;
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};


export type AlbumPhotosArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};

/** The pagination object for elements of type 'Album'. */
export type AlbumPage = {
   __typename?: 'AlbumPage';
  /** The elements of type 'Album' in this page. */
  data: Array<Maybe<Album>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

export type Photo = {
   __typename?: 'Photo';
  url: Scalars['String'];
  /** The document's ID. */
  _id: Scalars['ID'];
  album: Album;
  title?: Maybe<Scalars['String']>;
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};

/** The pagination object for elements of type 'Photo'. */
export type PhotoPage = {
   __typename?: 'PhotoPage';
  /** The elements of type 'Photo' in this page. */
  data: Array<Maybe<Photo>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

export type Query = {
   __typename?: 'Query';
  /** Find a document from the collection of 'Album' by its id. */
  findAlbumByID?: Maybe<Album>;
  /** Find a document from the collection of 'Photo' by its id. */
  findPhotoByID?: Maybe<Photo>;
  allAlbums: AlbumPage;
  allPhotos: PhotoPage;
};


export type QueryFindAlbumByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindPhotoByIdArgs = {
  id: Scalars['ID'];
};


export type QueryAllAlbumsArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};


export type QueryAllPhotosArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};


export type FindAlbumByIdQueryVariables = {
  albumID: Scalars['ID'];
};


export type FindAlbumByIdQuery = (
  { __typename?: 'Query' }
  & { findAlbumByID?: Maybe<(
    { __typename?: 'Album' }
    & Pick<Album, 'title'>
    & { photos: (
      { __typename?: 'PhotoPage' }
      & { data: Array<Maybe<(
        { __typename?: 'Photo' }
        & Pick<Photo, '_id' | 'url'>
      )>> }
    ) }
  )> }
);

export type GetAlbumsQueryVariables = {};


export type GetAlbumsQuery = (
  { __typename?: 'Query' }
  & { allAlbums: (
    { __typename?: 'AlbumPage' }
    & { data: Array<Maybe<(
      { __typename?: 'Album' }
      & Pick<Album, 'title' | '_id'>
    )>> }
  ) }
);

export type GetAlbumsHomeQueryVariables = {};


export type GetAlbumsHomeQuery = (
  { __typename?: 'Query' }
  & { allAlbums: (
    { __typename?: 'AlbumPage' }
    & { data: Array<Maybe<(
      { __typename?: 'Album' }
      & Pick<Album, 'title' | 'coverPhoto' | '_id'>
    )>> }
  ) }
);
