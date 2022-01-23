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

export const SEARCH_GOOGLE_BOOKS = gpl`
  query searchQuery($search: String) {
 }
`