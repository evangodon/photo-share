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
  photoOrder: Array<Maybe<Scalars['String']>>;
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
  /** Update an existing document in the collection of 'User' */
  updateUser?: Maybe<User>;
  /** Create a new document in the collection of 'User' */
  createUser: User;
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
  /** Delete an existing document in the collection of 'User' */
  deleteUser?: Maybe<User>;
  /** Create a new document in the collection of 'Photo' */
  createPhoto: Photo;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  data: UserInput;
};


export type MutationCreateUserArgs = {
  data: UserInput;
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


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
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
  photoId: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  url: Scalars['String'];
  album?: Maybe<PhotoAlbumRelation>;
  postedBy?: Maybe<PhotoPostedByRelation>;
};

/** Allow manipulating the relationship between the types 'Photo' and 'User' using the field 'Photo.postedBy'. */
export type PhotoPostedByRelation = {
  /** Create a document of type 'User' and associate it with the current document. */
  create?: Maybe<UserInput>;
  /** Connect a document of type 'User' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>;
};


/** 'User' input values */
export type UserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  image: Scalars['String'];
};

export type Album = {
   __typename?: 'Album';
  photoOrder: Array<Maybe<Scalars['String']>>;
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
  postedBy: User;
  url: Scalars['String'];
  /** The document's ID. */
  _id: Scalars['ID'];
  album: Album;
  title?: Maybe<Scalars['String']>;
  photoId: Scalars['ID'];
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
  /** Find a document from the collection of 'Photo' by its id. */
  findPhotoByID?: Maybe<Photo>;
  findUserByEmail: Array<Maybe<User>>;
  allAlbums: AlbumPage;
  /** Find a document from the collection of 'Album' by its id. */
  findAlbumByID?: Maybe<Album>;
  /** Find a document from the collection of 'User' by its id. */
  findUserByID?: Maybe<User>;
  allPhotos: PhotoPage;
};


export type QueryFindPhotoByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindUserByEmailArgs = {
  email: Scalars['String'];
};


export type QueryAllAlbumsArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};


export type QueryFindAlbumByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindUserByIdArgs = {
  id: Scalars['ID'];
};


export type QueryAllPhotosArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};

export type User = {
   __typename?: 'User';
  name: Scalars['String'];
  email: Scalars['String'];
  image: Scalars['String'];
  /** The document's ID. */
  _id: Scalars['ID'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};


export type FindUserByEmailQueryVariables = {
  email: Scalars['String'];
};


export type FindUserByEmailQuery = (
  { __typename?: 'Query' }
  & { findUserByEmail: Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'email' | 'name' | 'image'>
  )>> }
);

export type CreateUserMutationVariables = {
  email: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
};


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, '_id' | 'email' | 'name' | 'image'>
  ) }
);

export type FindAlbumByIdQueryVariables = {
  albumId: Scalars['ID'];
};


export type FindAlbumByIdQuery = (
  { __typename?: 'Query' }
  & { findAlbumByID?: Maybe<(
    { __typename?: 'Album' }
    & Pick<Album, 'title' | 'coverPhoto' | 'photoOrder'>
    & { photos: (
      { __typename?: 'PhotoPage' }
      & { data: Array<Maybe<(
        { __typename?: 'Photo' }
        & Pick<Photo, 'photoId' | '_id' | 'url'>
        & { postedBy: (
          { __typename?: 'User' }
          & Pick<User, '_id'>
        ) }
      )>> }
    ) }
  )> }
);

export type FindAlbumPhotosQueryVariables = {
  albumId: Scalars['ID'];
};


export type FindAlbumPhotosQuery = (
  { __typename?: 'Query' }
  & { findAlbumByID?: Maybe<(
    { __typename?: 'Album' }
    & Pick<Album, 'photoOrder'>
    & { photos: (
      { __typename?: 'PhotoPage' }
      & { data: Array<Maybe<(
        { __typename?: 'Photo' }
        & Pick<Photo, 'photoId' | '_id' | 'url'>
      )>> }
    ) }
  )> }
);

export type FindPhotoByIdQueryVariables = {
  photoId: Scalars['ID'];
};


export type FindPhotoByIdQuery = (
  { __typename?: 'Query' }
  & { findPhotoByID?: Maybe<(
    { __typename?: 'Photo' }
    & Pick<Photo, '_id' | 'url'>
    & { postedBy: (
      { __typename?: 'User' }
      & Pick<User, '_id'>
    ), album: (
      { __typename?: 'Album' }
      & Pick<Album, '_id' | 'title'>
    ) }
  )> }
);

export type DeletePhotoMutationVariables = {
  id: Scalars['ID'];
};


export type DeletePhotoMutation = (
  { __typename?: 'Mutation' }
  & { deletePhoto?: Maybe<(
    { __typename?: 'Photo' }
    & Pick<Photo, '_id'>
  )> }
);

export type DeleteAlbumMutationVariables = {
  id: Scalars['ID'];
};


export type DeleteAlbumMutation = (
  { __typename?: 'Mutation' }
  & { deleteAlbum?: Maybe<(
    { __typename?: 'Album' }
    & Pick<Album, '_id'>
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

export type PartialUpdateAlbumMutationVariables = {
  id: Scalars['ID'];
  title: Scalars['String'];
  coverPhoto?: Maybe<Scalars['String']>;
  photoOrder: Array<Maybe<Scalars['String']>>;
  photos: Array<PhotoInput>;
};


export type PartialUpdateAlbumMutation = (
  { __typename?: 'Mutation' }
  & { updateAlbum?: Maybe<(
    { __typename?: 'Album' }
    & Pick<Album, '_id' | 'title'>
  )> }
);

export type CreateAlbumMutationVariables = {
  title: Scalars['String'];
  coverPhoto?: Maybe<Scalars['String']>;
  photoOrder: Array<Maybe<Scalars['String']>>;
  photos: Array<PhotoInput>;
};


export type CreateAlbumMutation = (
  { __typename?: 'Mutation' }
  & { createAlbum: (
    { __typename?: 'Album' }
    & Pick<Album, '_id'>
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
