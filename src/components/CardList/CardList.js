/** @jsxImportSource @emotion/react */
import { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LOAD_ANIME } from '../../queries';
import { css } from '@emotion/react';
import { v4 as uuid } from 'uuid';
import LoadingIcon from '../LoadingIcon';
import PropTypes from 'prop-types';
import Card from '../Card';

function CardList({ page }) {
  const navigate = useNavigate();
  const [queryData, setQueryData] = useState({});

  const styles = css`
    .content-loading-icon {
      height: 50px;
      margin-top: 90px;
      margin-left: auto;
      margin-right: auto;
      display: flex;
      justify-content: center;
      fill: white;
    }
  `;

  const contStyles = css`
    .entry-list-title {
      margin-left: 10px;
      margin-bottom: 10px;
      font-weight: 700;
      font-family: 'Overpass', sans-serif;
      font-size: 1.4rem;
      color: #808a93;
    }
  `;

  const gridStyles = css`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 25px 20px;
    justify-content: space-between;

    /* tablet */
    @media (min-width: 640px) and (max-width: 800px) {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    }

    /* mobile */
    @media (max-width: 640px) {
      gap: 15px 10px;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    }
  `;

  const emptyStyles = css`
    height: 40vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
      font-size: 4rem;
      font-family: 'Overpass', sans-serif;
      font-weight: 400;
      color: #739dc238;
    }

    h2 {
      font-size: 0.9rem;
      font-family: 'Overpass', sans-serif;
      font-weight: 600;
      color: #739dc26e;
    }

    /* mobile */
    @media (max-width: 640px) {
      h1 {
        font-size: 3rem;
      }

      h2 {
        font-size: 0.7rem;
      }
    }
  `;

  const handleErrors = e => {
    console.log(e);
    if (e.graphQLErrors) {
      e.graphQLErrors.forEach(error => {
        if (error.status === 404) {
          navigate('/');
        }
      });
    } else {
      e.networkErrors.forEach(error => {
        console.log(error);
      });
    }
  };

  const { loading } = useQuery(LOAD_ANIME, {
    onError: handleErrors,
    onCompleted: data => {
      console.log('data <-', data);
      setQueryData(data);
    },
    variables: { sort: 'TRENDING_DESC', page: parseInt(page) },
  });

  const listCards = useMemo(() => {
    if (!queryData.Page) {
      return <div>Memuat</div>;
    }

    if (queryData.Page.media.length === 0) {
      return (
        <div css={emptyStyles}>
          <h1>¯\_(ツ)_/¯</h1>
          <h2>Data tidak ada</h2>
        </div>
      );
    }

    let defaultLists = [];

    const cardData = [...queryData.Page.media];
    console.log('CARD_DATA', cardData);
    const listCard = cardData.map(entry => <Card data={entry} key={uuid()} />);
    defaultLists.push(listCard);

    defaultLists = (
      <div css={contStyles} key={uuid()}>
        <h1 className="entry-list-title">HAHAH</h1>
        <div css={gridStyles}>{defaultLists.flat(1)}</div>
      </div>
    );

    return <>{defaultLists}</>;
  }, [queryData]);

  if (loading) {
    return (
      <div css={styles}>
        <LoadingIcon />
      </div>
    );
  }

  return <div css={styles}>{listCards}</div>;
}

CardList.propTypes = {
  page: PropTypes.string.isRequired,
};

export default CardList;
