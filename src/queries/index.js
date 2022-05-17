import { gql } from '@apollo/client';

export const LOAD_ANIME = gql`
  query ($sort: [MediaSort], $page: Int!, $perPage: Int!) {
    Page(page: $page, perPage: $perPage) {
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

export const GET_ANIME_BY_ID = gql`
  query GetAnime($id: Int!) {
    Media(id: $id) {
      id
      title {
        romaji
        english
      }
      siteUrl
      coverImage {
        extraLarge
        medium
        large
      }
      popularity
      favourites
      bannerImage
      description(asHtml: false)
      status
      episodes
      season
      seasonYear
      format
      startDate {
        year
        month
        day
      }
      duration
      source
      type
      genres
      averageScore
      nextAiringEpisode {
        timeUntilAiring
        episode
        airingAt
      }
      isAdult
      trailer {
        id
      }
      studios {
        edges {
          node {
            name
          }
        }
      }
      characters {
        edges {
          node {
            id
            name {
              full
              native
            }
            image {
              large
            }
            age
            favourites
          }
          role
          voiceActors {
            name {
              full
            }
            languageV2
            image {
              large
            }
          }
        }
      }
    }
  }
`;
