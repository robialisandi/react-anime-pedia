/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  const HEADER_STYLE = css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: rgba(255, 255, 255, 0.97);
    height: 60px;
    padding: 0 4.8rem;
    position: relative;
    box-shadow: 0 0.0625rem 0.125rem 0 rgb(0 0 0 / 7%);
  `;

  const container = css`
    max-width: 1300px;
    width: 85%;
    margin: 0 auto 50px auto;

    /* tablet */
    @media (min-width: 640px) and (max-width: 800px) {
      width: 90%;
    }
    /* mobile */
    @media (max-width: 640px) {
      width: 92%;
    }
  `;
  return (
    <>
      <header css={HEADER_STYLE}>Header</header>
      <div css={container}>
        <Outlet />
      </div>
      <div>Footer</div>
    </>
  );
};

export default AppLayout;
