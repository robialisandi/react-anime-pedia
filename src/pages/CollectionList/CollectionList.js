/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import CardHorizontal from '../../components/Card/CardHorizontal/CardHorizontal';

const Collection = () => {
  const { collects } = useSelector(state => state.collections);
  return (
    <div css={container}>
      <Grid container spacing={3}>
        {collects.map(coll => {
          console.log('col', coll);
          return (
            // <Link key={coll.id} css={styles} to={`/collection/${coll.id}`}>
            //   <div className="con">
            //     <span>{coll.title}</span>
            //   </div>
            // </Link>
            <Grid id="cik" item xs={12} md={4} key={coll.id}>
              <CardHorizontal data={coll} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

const container = css`
  min-height: 100vh;
  margin-top: 37px;
`;

export default Collection;
