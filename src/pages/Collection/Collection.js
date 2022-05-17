/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Card from '../../components/Card';

const Collection = () => {
  const { id } = useParams();
  const collects = useSelector(state =>
    state.collections.collects.find(coll => coll.id === id)
  );
  console.log('collects', collects);

  return (
    <div css={container}>
      <div css={wrapperLoading}>
        <div css={gridStyles}>
          {collects.list.map(entry => {
            console.log('tes', entry);
            return <Card entry={entry} key={entry.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

const container = css`
  min-height: 100vh;
  margin-top: 37px;

  .paging {
    margin-bottom: 25px;
  }

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

const wrapperLoading = css`
  .content-loading-icon {
    height: 50px;
    margin: 120px auto;
    display: flex;
  }
`;

const gridStyles = css`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 15px 15px;
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

export default Collection;
