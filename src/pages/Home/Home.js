/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import CardList from '../../components/CardList';

const Home = () => {
  const styles = css`
    background-color: #f4f4f4;
    min-height: 100vh;
  `;

  return (
    <div css={styles}>
      <div className='content-cont'>
        <CardList />
      </div>
    </div>
  );
};

export default Home;
