import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      savedBooks[]
    }
  }
`;

export const QUERY_BOOKS = gql`
  query savedBooks($_id: String) {
    savedBooks(_id: $_id) {
      _id
    }
  }
`;