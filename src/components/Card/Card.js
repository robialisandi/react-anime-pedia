/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { css } from '@emotion/react';

function Card({ entry }) {
  const styles = css`
    border: none;
    display: grid;
    cursor: pointer;
    grid-template-rows: auto 45px;
    padding: 12px 12px 8px 12px;
    text-decoration: none;

    &:hover,
    &:focus {
      .img-cont {
        transform: translateY(-1px);
        box-shadow: 0 14px 30px rgba(0, 5, 15, 0.15),
          0 4px 4px rgba(0, 5, 15, 0.05);
      }
      h3 {
        color: #48b151;
      }
    }

    .img-cont {
      background-color: #adeeb2;
      border-radius: 4px;
      height: 100%;

      span {
        overflow: hidden;
        border-radius: 4px;
        height: 100%;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }

    h3 {
      font-weight: 600;
      line-height: 20px;
      margin-top: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      font-family: 'Overpass', sans-serif;
      color: #6c6c6c;
      font-size: 0.95rem;
      transition: 0.14s ease;
      text-align: left;
      height: 42px;
      transition: color 0.3s ease;
    }

    @media (max-width: 640px) {
      padding: 5px;

      h3 {
        text-align: center;
        font-size: 0.9rem;
      }
    }
  `;
  return (
    <Link css={styles} to={`/anime/${entry.id}`}>
      <div className="img-cont">
        <LazyLoadImage
          src={entry.coverImage.large}
          alt={entry.title.english ?? entry.title.romaji}
          effect="opacity"
        />
      </div>
      <h3>{entry.title.english ?? entry.title.romaji}</h3>
    </Link>
  );
}

export default Card;
