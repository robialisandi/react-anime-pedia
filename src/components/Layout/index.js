/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

const AppLayout = props => {
  const container = css`
    max-width: '1200px';
  `;
  return (
    <>
      <div>Header</div>
      <div css={container}>
        <Outlet />
      </div>
      <div>Footer</div>
    </>
  );
};

export default AppLayout;
