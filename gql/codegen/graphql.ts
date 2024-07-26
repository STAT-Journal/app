/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Follow = {
  __typename?: 'Follow';
  followee?: Maybe<Profile>;
  follower?: Maybe<Profile>;
};

export type Moment = {
  __typename?: 'Moment';
  insertedAt?: Maybe<Scalars['String']['output']>;
  type?: Maybe<MomentType>;
};

export enum MomentType {
  Bad = 'BAD',
  Good = 'GOOD'
}

export type Profile = {
  __typename?: 'Profile';
  avatar?: Maybe<Scalars['Int']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type RootMutationType = {
  __typename?: 'RootMutationType';
  buySticker?: Maybe<Transaction>;
  createFollow?: Maybe<Follow>;
  createMoment?: Maybe<Moment>;
  createProfile?: Maybe<Profile>;
  createTextPost?: Maybe<TextPost>;
  createWeeklyCheckin?: Maybe<WeeklyCheckIn>;
  devGetSessionToken?: Maybe<Scalars['String']['output']>;
  getSessionToken?: Maybe<Scalars['String']['output']>;
  register?: Maybe<Scalars['String']['output']>;
  renewRenewalToken?: Maybe<Scalars['String']['output']>;
};


export type RootMutationTypeBuyStickerArgs = {
  stickerType: Scalars['ID']['input'];
};


export type RootMutationTypeCreateFollowArgs = {
  followedId: Scalars['ID']['input'];
};


export type RootMutationTypeCreateMomentArgs = {
  type: MomentType;
};


export type RootMutationTypeCreateProfileArgs = {
  avatar?: InputMaybe<Scalars['Int']['input']>;
  username: Scalars['String']['input'];
};


export type RootMutationTypeCreateTextPostArgs = {
  body: Scalars['String']['input'];
};


export type RootMutationTypeCreateWeeklyCheckinArgs = {
  valence: Scalars['String']['input'];
};


export type RootMutationTypeGetSessionTokenArgs = {
  renewalToken: Scalars['String']['input'];
};


export type RootMutationTypeRegisterArgs = {
  email: Scalars['String']['input'];
};


export type RootMutationTypeRenewRenewalTokenArgs = {
  renewalToken: Scalars['String']['input'];
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  listMoments?: Maybe<Array<Maybe<Moment>>>;
  listTextPosts?: Maybe<Array<Maybe<TextPost>>>;
  listTransactions?: Maybe<Array<Maybe<Transaction>>>;
  me?: Maybe<User>;
  unsafeCheckIfUserCanCheckIn?: Maybe<Scalars['Boolean']['output']>;
  verifyRenewalToken?: Maybe<User>;
  verifySessionToken?: Maybe<User>;
};


export type RootQueryTypeVerifyRenewalTokenArgs = {
  renewalToken: Scalars['String']['input'];
};


export type RootQueryTypeVerifySessionTokenArgs = {
  sessionToken: Scalars['String']['input'];
};

export type StickerType = {
  __typename?: 'StickerType';
  name?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type TextPost = {
  __typename?: 'TextPost';
  body?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type Transaction = {
  __typename?: 'Transaction';
  change?: Maybe<Scalars['Int']['output']>;
  stickerType?: Maybe<StickerType>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  profile?: Maybe<Profile>;
};

export type WeeklyCheckIn = {
  __typename?: 'WeeklyCheckIn';
  weekNumber?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type DevGetSessionTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type DevGetSessionTokenMutation = { __typename?: 'RootMutationType', devGetSessionToken?: string | null };

export type RegisterWithEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type RegisterWithEmailMutation = { __typename?: 'RootMutationType', register?: string | null };

export type GetSessionTokenMutationVariables = Exact<{
  renewalToken: Scalars['String']['input'];
}>;


export type GetSessionTokenMutation = { __typename?: 'RootMutationType', getSessionToken?: string | null };

export type MyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type MyProfileQuery = { __typename?: 'RootQueryType', me?: { __typename?: 'User', email?: string | null, profile?: { __typename?: 'Profile', avatar?: number | null, username?: string | null } | null } | null };


export const DevGetSessionTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"devGetSessionToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"devGetSessionToken"}}]}}]} as unknown as DocumentNode<DevGetSessionTokenMutation, DevGetSessionTokenMutationVariables>;
export const RegisterWithEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"registerWithEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<RegisterWithEmailMutation, RegisterWithEmailMutationVariables>;
export const GetSessionTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"getSessionToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"renewalToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSessionToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"renewalToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"renewalToken"}}}]}]}}]} as unknown as DocumentNode<GetSessionTokenMutation, GetSessionTokenMutationVariables>;
export const MyProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"myProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<MyProfileQuery, MyProfileQueryVariables>;