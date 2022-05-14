import { gql } from '@apollo/client';

export const LOAD_ANIME = gql`
  query loadAnime($sort: [MediaSort]) {
    Page {
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
