import { gql } from '@apollo/client';

export const GET_EXAM = gql`
  query GetDogs($ids: [ID]!) {
    questions(where: { id_in: $ids }) {
      id
      value
      answers {
        id
        value
      }
      image {
        url
      }
      correct {
        id
        value
      }
    }
  }
`;
