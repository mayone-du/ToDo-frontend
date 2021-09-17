import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  SocialCamelJSON: any;
  /**
   * Create scalar that ignores normal serialization/deserialization, since
   * that will be handled by the multipart request spec
   */
  Upload: any;
};

export type CreateProfileMutationInput = {
  profileName: Scalars['String'];
  profileImage?: Maybe<Scalars['Upload']>;
  selfIntroduction?: Maybe<Scalars['String']>;
  githubUsername?: Maybe<Scalars['String']>;
  twitterUsername?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateProfileMutationPayload = {
  __typename?: 'CreateProfileMutationPayload';
  profile?: Maybe<ProfileNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateTaskMutationInput = {
  title: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  taskImage?: Maybe<Scalars['Upload']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateTaskMutationPayload = {
  __typename?: 'CreateTaskMutationPayload';
  task?: Maybe<TaskNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};


export type DeleteTaskMutationInput = {
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteTaskMutationPayload = {
  __typename?: 'DeleteTaskMutationPayload';
  task?: Maybe<TaskNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Social Auth Mutation */
  socialAuth?: Maybe<SocialAuth>;
  createProfile?: Maybe<CreateProfileMutationPayload>;
  updateProfile?: Maybe<UpdateProfileMutationPayload>;
  createTask?: Maybe<CreateTaskMutationPayload>;
  updateTask?: Maybe<UpdateTaskMutationPayload>;
  deleteTask?: Maybe<DeleteTaskMutationPayload>;
};


export type MutationSocialAuthArgs = {
  accessToken: Scalars['String'];
  provider: Scalars['String'];
};


export type MutationCreateProfileArgs = {
  input: CreateProfileMutationInput;
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileMutationInput;
};


export type MutationCreateTaskArgs = {
  input: CreateTaskMutationInput;
};


export type MutationUpdateTaskArgs = {
  input: UpdateTaskMutationInput;
};


export type MutationDeleteTaskArgs = {
  input: DeleteTaskMutationInput;
};

/** An object with an ID */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID'];
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
};

export type ProfileNode = Node & {
  __typename?: 'ProfileNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  relatedUser: UserNode;
  profileName: Scalars['String'];
  profileImage?: Maybe<Scalars['String']>;
  selfIntroduction?: Maybe<Scalars['String']>;
  githubUsername?: Maybe<Scalars['String']>;
  twitterUsername?: Maybe<Scalars['String']>;
  websiteUrl?: Maybe<Scalars['String']>;
};

export type ProfileNodeConnection = {
  __typename?: 'ProfileNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ProfileNodeEdge>>;
};

/** A Relay edge containing a `ProfileNode` and its cursor. */
export type ProfileNodeEdge = {
  __typename?: 'ProfileNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<ProfileNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<UserNode>;
  allUsers?: Maybe<UserNodeConnection>;
  myUserInfo?: Maybe<UserNode>;
  profile?: Maybe<ProfileNode>;
  myProfile?: Maybe<ProfileNode>;
  allProfiles?: Maybe<ProfileNodeConnection>;
  task?: Maybe<TaskNode>;
  myAllTasks?: Maybe<TaskNodeConnection>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryAllUsersArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
  username_Icontains?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  email_Icontains?: Maybe<Scalars['String']>;
  isStaff?: Maybe<Scalars['Boolean']>;
  isSuperuser?: Maybe<Scalars['Boolean']>;
};


export type QueryProfileArgs = {
  id: Scalars['ID'];
};


export type QueryAllProfilesArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  profileName?: Maybe<Scalars['String']>;
  profileName_Icontains?: Maybe<Scalars['String']>;
  selfIntroduction?: Maybe<Scalars['String']>;
  selfIntroduction_Icontains?: Maybe<Scalars['String']>;
  githubUsername?: Maybe<Scalars['String']>;
  githubUsername_Icontains?: Maybe<Scalars['String']>;
  twitterUsername?: Maybe<Scalars['String']>;
  twitterUsername_Icontains?: Maybe<Scalars['String']>;
};


export type QueryTaskArgs = {
  id: Scalars['ID'];
};


export type QueryMyAllTasksArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  title_Icontains?: Maybe<Scalars['String']>;
};

/** Social Auth Mutation */
export type SocialAuth = {
  __typename?: 'SocialAuth';
  social?: Maybe<SocialType>;
};


export type SocialNode = Node & {
  __typename?: 'SocialNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  user: UserNode;
  provider: Scalars['String'];
  uid: Scalars['String'];
  extraData?: Maybe<Scalars['SocialCamelJSON']>;
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
};

export type SocialNodeConnection = {
  __typename?: 'SocialNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<SocialNodeEdge>>;
};

/** A Relay edge containing a `SocialNode` and its cursor. */
export type SocialNodeEdge = {
  __typename?: 'SocialNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<SocialNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type SocialType = {
  __typename?: 'SocialType';
  id: Scalars['ID'];
  user: UserNode;
  provider: Scalars['String'];
  uid: Scalars['String'];
  extraData?: Maybe<Scalars['SocialCamelJSON']>;
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
};

export type Subscription = {
  __typename?: 'Subscription';
  countSeconds?: Maybe<Scalars['Float']>;
};


export type SubscriptionCountSecondsArgs = {
  upTo?: Maybe<Scalars['Int']>;
};

export type TaskNode = Node & {
  __typename?: 'TaskNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  createUser: UserNode;
  title: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  taskImage?: Maybe<Scalars['String']>;
  isDone: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
};

export type TaskNodeConnection = {
  __typename?: 'TaskNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<TaskNodeEdge>>;
};

/** A Relay edge containing a `TaskNode` and its cursor. */
export type TaskNodeEdge = {
  __typename?: 'TaskNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<TaskNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type UpdateProfileMutationInput = {
  id: Scalars['ID'];
  profileName: Scalars['String'];
  profileImage?: Maybe<Scalars['Upload']>;
  selfIntroduction?: Maybe<Scalars['String']>;
  githubUsername?: Maybe<Scalars['String']>;
  twitterUsername?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateProfileMutationPayload = {
  __typename?: 'UpdateProfileMutationPayload';
  profile?: Maybe<ProfileNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateTaskMutationInput = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  isDone?: Maybe<Scalars['Boolean']>;
  taskImage?: Maybe<Scalars['Upload']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateTaskMutationPayload = {
  __typename?: 'UpdateTaskMutationPayload';
  task?: Maybe<TaskNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};


export type UserNode = Node & {
  __typename?: 'UserNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  password: Scalars['String'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  /** 全ての権限を持っているとみなされます。 */
  isSuperuser: Scalars['Boolean'];
  username: Scalars['String'];
  email: Scalars['String'];
  isActive: Scalars['Boolean'];
  isStaff: Scalars['Boolean'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  relatedUser?: Maybe<ProfileNode>;
  createUser: TaskNodeConnection;
  socialAuth: SocialNodeConnection;
};


export type UserNodeCreateUserArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  title_Icontains?: Maybe<Scalars['String']>;
};


export type UserNodeSocialAuthArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  uid?: Maybe<Scalars['String']>;
  uid_In?: Maybe<Array<Maybe<Scalars['String']>>>;
  provider?: Maybe<Scalars['String']>;
  provider_In?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UserNodeConnection = {
  __typename?: 'UserNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<UserNodeEdge>>;
};

/** A Relay edge containing a `UserNode` and its cursor. */
export type UserNodeEdge = {
  __typename?: 'UserNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<UserNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type CreateProfileMutationVariables = Exact<{
  profileName: Scalars['String'];
}>;


export type CreateProfileMutation = (
  { __typename?: 'Mutation' }
  & { createProfile?: Maybe<(
    { __typename?: 'CreateProfileMutationPayload' }
    & { profile?: Maybe<(
      { __typename?: 'ProfileNode' }
      & Pick<ProfileNode, 'id' | 'profileName'>
    )> }
  )> }
);

export type SocialAuthMutationVariables = Exact<{
  accessToken: Scalars['String'];
}>;


export type SocialAuthMutation = (
  { __typename?: 'Mutation' }
  & { socialAuth?: Maybe<(
    { __typename?: 'SocialAuth' }
    & { social?: Maybe<(
      { __typename?: 'SocialType' }
      & Pick<SocialType, 'id' | 'provider' | 'uid' | 'extraData' | 'created' | 'modified'>
      & { user: (
        { __typename?: 'UserNode' }
        & Pick<UserNode, 'id' | 'email' | 'isActive'>
      ) }
    )> }
  )> }
);

export type CreateTaskMutationVariables = Exact<{
  title: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  taskImage?: Maybe<Scalars['Upload']>;
}>;


export type CreateTaskMutation = (
  { __typename?: 'Mutation' }
  & { createTask?: Maybe<(
    { __typename?: 'CreateTaskMutationPayload' }
    & { task?: Maybe<(
      { __typename?: 'TaskNode' }
      & Pick<TaskNode, 'id' | 'title' | 'content'>
    )> }
  )> }
);

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTaskMutation = (
  { __typename?: 'Mutation' }
  & { deleteTask?: Maybe<(
    { __typename?: 'DeleteTaskMutationPayload' }
    & { task?: Maybe<(
      { __typename?: 'TaskNode' }
      & Pick<TaskNode, 'id'>
    )> }
  )> }
);

export type UpdateTaskMutationVariables = Exact<{
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  isDone?: Maybe<Scalars['Boolean']>;
  taskImage?: Maybe<Scalars['Upload']>;
}>;


export type UpdateTaskMutation = (
  { __typename?: 'Mutation' }
  & { updateTask?: Maybe<(
    { __typename?: 'UpdateTaskMutationPayload' }
    & { task?: Maybe<(
      { __typename?: 'TaskNode' }
      & Pick<TaskNode, 'id'>
    )> }
  )> }
);

export type GetMyAllTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyAllTasksQuery = (
  { __typename?: 'Query' }
  & { myAllTasks?: Maybe<(
    { __typename?: 'TaskNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'TaskNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'TaskNode' }
        & Pick<TaskNode, 'id' | 'title' | 'content' | 'isDone' | 'createdAt' | 'taskImage'>
      )> }
    )>> }
  )> }
);

export type GetTaskQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetTaskQuery = (
  { __typename?: 'Query' }
  & { task?: Maybe<(
    { __typename?: 'TaskNode' }
    & Pick<TaskNode, 'id' | 'title' | 'content' | 'taskImage' | 'isDone'>
    & { createUser: (
      { __typename?: 'UserNode' }
      & Pick<UserNode, 'id' | 'email'>
    ) }
  )> }
);

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = (
  { __typename?: 'Query' }
  & { allUsers?: Maybe<(
    { __typename?: 'UserNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'UserNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'UserNode' }
        & Pick<UserNode, 'id' | 'email' | 'username'>
        & { relatedUser?: Maybe<(
          { __typename?: 'ProfileNode' }
          & Pick<ProfileNode, 'id' | 'profileName' | 'selfIntroduction'>
        )> }
      )> }
    )>> }
  )> }
);

export type GetMyUserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyUserInfoQuery = (
  { __typename?: 'Query' }
  & { myUserInfo?: Maybe<(
    { __typename?: 'UserNode' }
    & Pick<UserNode, 'id' | 'email' | 'username'>
  )> }
);

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'UserNode' }
    & Pick<UserNode, 'id' | 'username' | 'email' | 'firstName' | 'lastName'>
    & { relatedUser?: Maybe<(
      { __typename?: 'ProfileNode' }
      & Pick<ProfileNode, 'id' | 'profileName' | 'selfIntroduction' | 'githubUsername' | 'twitterUsername' | 'websiteUrl'>
    )> }
  )> }
);

export type CountSecondsSubscriptionVariables = Exact<{
  seconds: Scalars['Int'];
}>;


export type CountSecondsSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'countSeconds'>
);


export const CreateProfileDocument = gql`
    mutation CreateProfile($profileName: String!) {
  createProfile(input: {profileName: $profileName}) {
    profile {
      id
      profileName
    }
  }
}
    `;
export type CreateProfileMutationFn = Apollo.MutationFunction<CreateProfileMutation, CreateProfileMutationVariables>;

/**
 * __useCreateProfileMutation__
 *
 * To run a mutation, you first call `useCreateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProfileMutation, { data, loading, error }] = useCreateProfileMutation({
 *   variables: {
 *      profileName: // value for 'profileName'
 *   },
 * });
 */
export function useCreateProfileMutation(baseOptions?: Apollo.MutationHookOptions<CreateProfileMutation, CreateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProfileMutation, CreateProfileMutationVariables>(CreateProfileDocument, options);
      }
export type CreateProfileMutationHookResult = ReturnType<typeof useCreateProfileMutation>;
export type CreateProfileMutationResult = Apollo.MutationResult<CreateProfileMutation>;
export type CreateProfileMutationOptions = Apollo.BaseMutationOptions<CreateProfileMutation, CreateProfileMutationVariables>;
export const SocialAuthDocument = gql`
    mutation SocialAuth($accessToken: String!) {
  socialAuth(provider: "google-oauth2", accessToken: $accessToken) {
    social {
      id
      user {
        id
        email
        isActive
      }
      provider
      uid
      extraData
      created
      modified
    }
  }
}
    `;
export type SocialAuthMutationFn = Apollo.MutationFunction<SocialAuthMutation, SocialAuthMutationVariables>;

/**
 * __useSocialAuthMutation__
 *
 * To run a mutation, you first call `useSocialAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSocialAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [socialAuthMutation, { data, loading, error }] = useSocialAuthMutation({
 *   variables: {
 *      accessToken: // value for 'accessToken'
 *   },
 * });
 */
export function useSocialAuthMutation(baseOptions?: Apollo.MutationHookOptions<SocialAuthMutation, SocialAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SocialAuthMutation, SocialAuthMutationVariables>(SocialAuthDocument, options);
      }
export type SocialAuthMutationHookResult = ReturnType<typeof useSocialAuthMutation>;
export type SocialAuthMutationResult = Apollo.MutationResult<SocialAuthMutation>;
export type SocialAuthMutationOptions = Apollo.BaseMutationOptions<SocialAuthMutation, SocialAuthMutationVariables>;
export const CreateTaskDocument = gql`
    mutation CreateTask($title: String!, $content: String, $taskImage: Upload) {
  createTask(input: {title: $title, content: $content, taskImage: $taskImage}) {
    task {
      id
      title
      content
    }
  }
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      taskImage: // value for 'taskImage'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($id: ID!) {
  deleteTask(input: {id: $id}) {
    task {
      id
    }
  }
}
    `;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, options);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const UpdateTaskDocument = gql`
    mutation UpdateTask($id: ID!, $title: String, $content: String, $isDone: Boolean, $taskImage: Upload) {
  updateTask(
    input: {id: $id, title: $title, content: $content, isDone: $isDone, taskImage: $taskImage}
  ) {
    task {
      id
    }
  }
}
    `;
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      isDone: // value for 'isDone'
 *      taskImage: // value for 'taskImage'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const GetMyAllTasksDocument = gql`
    query GetMyAllTasks {
  myAllTasks {
    edges {
      node {
        id
        title
        content
        isDone
        createdAt
        taskImage
      }
    }
  }
}
    `;

/**
 * __useGetMyAllTasksQuery__
 *
 * To run a query within a React component, call `useGetMyAllTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyAllTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyAllTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyAllTasksQuery(baseOptions?: Apollo.QueryHookOptions<GetMyAllTasksQuery, GetMyAllTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyAllTasksQuery, GetMyAllTasksQueryVariables>(GetMyAllTasksDocument, options);
      }
export function useGetMyAllTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyAllTasksQuery, GetMyAllTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyAllTasksQuery, GetMyAllTasksQueryVariables>(GetMyAllTasksDocument, options);
        }
export type GetMyAllTasksQueryHookResult = ReturnType<typeof useGetMyAllTasksQuery>;
export type GetMyAllTasksLazyQueryHookResult = ReturnType<typeof useGetMyAllTasksLazyQuery>;
export type GetMyAllTasksQueryResult = Apollo.QueryResult<GetMyAllTasksQuery, GetMyAllTasksQueryVariables>;
export const GetTaskDocument = gql`
    query GetTask($id: ID!) {
  task(id: $id) {
    id
    title
    content
    taskImage
    isDone
    createUser {
      id
      email
    }
  }
}
    `;

/**
 * __useGetTaskQuery__
 *
 * To run a query within a React component, call `useGetTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaskQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTaskQuery(baseOptions: Apollo.QueryHookOptions<GetTaskQuery, GetTaskQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, options);
      }
export function useGetTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTaskQuery, GetTaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, options);
        }
export type GetTaskQueryHookResult = ReturnType<typeof useGetTaskQuery>;
export type GetTaskLazyQueryHookResult = ReturnType<typeof useGetTaskLazyQuery>;
export type GetTaskQueryResult = Apollo.QueryResult<GetTaskQuery, GetTaskQueryVariables>;
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  allUsers(isSuperuser: false) {
    edges {
      node {
        id
        email
        username
        relatedUser {
          id
          profileName
          selfIntroduction
        }
      }
    }
  }
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetMyUserInfoDocument = gql`
    query GetMyUserInfo {
  myUserInfo {
    id
    email
    username
  }
}
    `;

/**
 * __useGetMyUserInfoQuery__
 *
 * To run a query within a React component, call `useGetMyUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyUserInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyUserInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetMyUserInfoQuery, GetMyUserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyUserInfoQuery, GetMyUserInfoQueryVariables>(GetMyUserInfoDocument, options);
      }
export function useGetMyUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyUserInfoQuery, GetMyUserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyUserInfoQuery, GetMyUserInfoQueryVariables>(GetMyUserInfoDocument, options);
        }
export type GetMyUserInfoQueryHookResult = ReturnType<typeof useGetMyUserInfoQuery>;
export type GetMyUserInfoLazyQueryHookResult = ReturnType<typeof useGetMyUserInfoLazyQuery>;
export type GetMyUserInfoQueryResult = Apollo.QueryResult<GetMyUserInfoQuery, GetMyUserInfoQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($id: ID!) {
  user(id: $id) {
    id
    username
    email
    firstName
    lastName
    relatedUser {
      id
      profileName
      selfIntroduction
      githubUsername
      twitterUsername
      websiteUrl
    }
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const CountSecondsDocument = gql`
    subscription CountSeconds($seconds: Int!) {
  countSeconds(upTo: $seconds)
}
    `;

/**
 * __useCountSecondsSubscription__
 *
 * To run a query within a React component, call `useCountSecondsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCountSecondsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountSecondsSubscription({
 *   variables: {
 *      seconds: // value for 'seconds'
 *   },
 * });
 */
export function useCountSecondsSubscription(baseOptions: Apollo.SubscriptionHookOptions<CountSecondsSubscription, CountSecondsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CountSecondsSubscription, CountSecondsSubscriptionVariables>(CountSecondsDocument, options);
      }
export type CountSecondsSubscriptionHookResult = ReturnType<typeof useCountSecondsSubscription>;
export type CountSecondsSubscriptionResult = Apollo.SubscriptionResult<CountSecondsSubscription>;