/** @jsxImportSource @emotion/react */
import { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { css } from '@emotion/react';
import { usePagination } from '@mui/material';
import { useQuery } from '@apollo/client';
import { LOAD_ANIME } from '../../queries';

import LoadingIcon from '../../components/LoadingIcon';
import Card from '../../components/Card';

const queryString = require('query-string');

const infoPage = {
  total: 0,
  perPage: 10,
  currentPage: 1,
  lastPage: 0,
  hasNextPage: true,
};

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [defaultPage, setDefaultPage] = useState(1);
  const [page, setPage] = useState(infoPage);

  const container = css`
    min-height: 100vh;
    margin-top: 37px;

    .paging ul {
      justify-content: center;
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;

      button {
        cursor: pointer;
        margin: 0 3px;
      }
    }
  `;

  const styles = css`
    margin: 20px 0px;
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

  const { data, loading } = useQuery(LOAD_ANIME, {
    onError: handleErrors,
    onCompleted: data => {
      setPage({
        ...page,
        total: data.Page.pageInfo.total,
        lastPage: data.Page.pageInfo.lastPage,
      });
    },
    variables: {
      sort: 'TRENDING_DESC',
      page: page.currentPage,
      perPage: page.perPage,
    },
  });

  const onChangePage = (e, p) => {
    console.log('even', e);
    setPage({ ...page, currentPage: p });
    setDefaultPage(p);
  };

  useLayoutEffect(() => {
    const url = queryString.parse(location.search);

    if (url.page && ![1].includes(url.page)) {
      console.log('url', url, parseInt(url.page));
      setPage({ ...page, currentPage: parseInt(url.page) });
    }
  }, []);

  useEffect(() => {
    const url = queryString.parse(location.search);
    if (page.currentPage !== 1) {
      url.page = page.currentPage;
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
  }, [page.currentPage]);

  const { items } = usePagination({
    count: page.lastPage,
    page: defaultPage,
    onChange: onChangePage,
    hideNextButton: true,
    showLastButton: true,
  });

  useEffect(() => {
    const url = queryString.parse(location.search);

    if (url.page && ![1].includes(url.page)) {
      setDefaultPage(parseInt(url.page));
    }
  }, []);

  return (
    <div css={container}>
      <nav className="paging">
        <ul>
          {items.map(({ page, type, selected, ...item }, index) => {
            let children = null;

            if (type === 'start-ellipsis' || type === 'end-ellipsis') {
              children = '…';
            } else if (type === 'page') {
              children = (
                <button
                  type="button"
                  style={{
                    fontWeight: selected ? 'bold' : '100',
                    background: selected ? '#5add65' : undefined,
                    borderRadius: selected ? '3px' : undefined,
                    border: selected ? '1px solid #2a8b32' : undefined,
                    padding: selected ? '2.2px 8px' : undefined,
                  }}
                  {...item}
                >
                  {page}
                </button>
              );
            } else {
              children = (
                <button type="button" {...item}>
                  {type}
                </button>
              );
            }

            return <li key={index}>{children}</li>;
          })}
        </ul>
      </nav>

      <div css={styles}>
        {loading ? (
          <LoadingIcon />
        ) : (
          <div css={contStyles}>
            <div css={gridStyles}>
              {data.Page.media.map(entry => (
                <Card entry={entry} key={entry.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
