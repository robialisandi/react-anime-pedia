/** @jsxImportSource @emotion/react */
import { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { css } from '@emotion/react';
import { Pagination } from '@mui/material';
import CardList from '../../components/CardList';

const queryString = require('query-string');

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState('1');

  const styles = css`
    min-height: 100vh;
  `;

  useLayoutEffect(() => {
    const url = queryString.parse(location.search);

    if (url.page && !['1'].includes(url.page)) {
      console.log('url', url, url.page);
      setPage(url.page);
    }
  }, []);

  useEffect(() => {
    const url = queryString.parse(location.search);
    if (page !== '1') {
      url.page = page;
      navigate(`${location.pathname}?${queryString.stringify(url)}`);
    } else {
      url.page = '';
      const params = queryString.stringify(url, { skipEmptyString: true });
      if (params !== '') {
        navigate(`${location.pathname}?${params}`);
      } else {
        navigate(`${location.pathname}`);
      }
    }
  }, [page]);

  return (
    <div css={styles}>
      <div className="content-cont">
        <CardList page={page} />
        <Pagination
          count={10}
          variant="outlined"
          shape="rounded"
          onChange={(e, p) => setPage(p)}
        />
      </div>
    </div>
  );
};

export default Home;
