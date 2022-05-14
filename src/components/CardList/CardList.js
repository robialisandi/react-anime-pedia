/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOAD_ANIME } from '../../queries';
import Card from '../Card';
import { css } from '@emotion/react';
import { v4 as uuid } from 'uuid';

const CardList = () => {
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
    max-width: 1300px;
    width: 85%;
    margin: 0 auto 50px auto;

    .entry-list-title {
      margin-left: 10px;
      margin-bottom: 10px;
      font-weight: 700;
      font-family: 'Overpass', sans-serif;
      font-size: 1.4rem;
      color: #808a93;
    }

    /* tablet */
    @media (min-width: 640px) and (max-width: 800px) {
      width: 90%;
    }
    /* mobile */
    @media (max-width: 640px) {
      width: 92%;
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
      console.log('setQueryData', data);
      setQueryData(data);
    },
    variables: { sort: 'TRENDING_DESC' },
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
    const cardList = cardData.map(entry => <Card data={entry} key={uuid()} />);
    defaultLists.push(cardList);

    defaultLists = (
      <div css={contStyles} key={uuid()}>
        <h1 className='entry-list-title'>HAHAH</h1>
        <div css={gridStyles}>{defaultLists.flat(1)}</div>
      </div>
    );

    return <>{defaultLists}</>;
  }, [queryData]);

  if (loading) {
    console.log('loading');
    return <div css={styles}>LOADING</div>;
  }

  return <div css={styles}>{listCards}</div>;
};

export default CardList;
