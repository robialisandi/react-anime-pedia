/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Collection = () => {
  const { collects } = useSelector(state => state.collections);
  return (
    <div css={container}>
      <div css={gridStyles}>
        {collects.map(coll => {
          return (
            <Link key={coll.id} css={styles} to={`/collection/${coll.id}`}>
              <div className="con">
                <span>{coll.title}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const container = css`
  min-height: 100vh;
  margin-top: 37px;
`;

const gridStyles = css`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 15px 15px;
  justify-content: space-between;

  @media (min-width: 640px) and (max-width: 800px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  @media (max-width: 640px) {
    gap: 15px 10px;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  }
`;

const styles = css`
  background: white;
  text-decoration: none;
  padding: 20px;
  color: gray;
`;

export default Collection;
