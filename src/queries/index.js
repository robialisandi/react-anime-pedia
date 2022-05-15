import { gql } from '@apollo/client';

export const LOAD_ANIME = gql`
  query ($sort: [MediaSort], $page: Int!) {
    Page(page: $page, perPage: 5) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(type: ANIME, sort: $sort) {
        id
        averageScore
        title {
          english
          romaji
        }
        coverImage {
          large
          medium
          color
        }
      }
    }
  }
`;
