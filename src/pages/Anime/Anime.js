/** @jsxImportSource @emotion/react */
import { useQuery } from '@apollo/client';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ButtonCollection from '../../components/Button';
import LoadingIcon from '../../components/LoadingIcon';
import Alert from '../../components/Alert';
import {
  addToCollection,
  allListCollections,
} from '../../features/collections/collectionsSlice';
import { GET_ANIME_BY_ID } from '../../queries';
import { Box } from '@mui/material';

const Anime = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState({});
  const [snackBar, setSnackBar] = useState(false);
  const { error, loading, data } = useQuery(GET_ANIME_BY_ID, {
    variables: { id: parseInt(id) },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) setAnime(data.Media);

    window.scrollTo(0, 0);
  }, [data]);

  const wrapperLoading = css`
    .content-loading-icon {
      height: 50px;
      margin: 120px auto;
      display: flex;
    }
  `;

  const handleCollections = useCallback(anime => {
    setSnackBar(false);
    console.log('click');
    console.log('masuk data', anime);
    dispatch(addToCollection(anime));
    setSnackBar(true);
  });

  const btnAdd = useMemo(() => {
    console.log('dataaaa', data?.Media);
    return (
      <ButtonCollection anime={data?.Media} onHandleClick={handleCollections} />
    );
  }, [data?.Media]);

  if (loading)
    return (
      <div css={wrapperLoading}>
        <LoadingIcon />
      </div>
    );
  if (error) return <p>Error {error}</p>;

  return (
    <Container>
      <Banner img={anime?.bannerImage} alt="cover">
        <Shadow />
      </Banner>
      <Wrapper>
        <Header>
          <Title>{anime?.title?.english || anime?.title?.romaji}</Title>
          <Box sx={{ flexGrow: 1 }} />
          <Info>
            <SubTitle>
              Popular {anime?.popularity} | favourites {anime?.favourites}
            </SubTitle>
            {btnAdd}
          </Info>
        </Header>
        <BoxWrapper>
          <Description
            dangerouslySetInnerHTML={{
              __html: anime.description || 'No Description',
            }}
          ></Description>
        </BoxWrapper>
      </Wrapper>
      <Alert
        isOpen={snackBar}
        message="Anime Added"
        onHandleClose={() => setSnackBar(false)}
      />
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  margin-top: 37px;
`;

const Banner = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  height: 400px;
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  background-image: ${props => `url(${props.img})`};
  background-size: cover;
`;

const Shadow = styled.div`
  background: linear-gradient(0deg, rgb(0 0 0 / 60%), transparent);
  height: 100%;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-beetwen;
  align-items: center;
`;

const Title = styled.span`
  z-index: 2;
  padding: 10px;
  background: #ffffffab;
  font-weight: bold;
  margin: 13px 0;
`;
const Info = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 12px;
`;
const SubTitle = styled.span`
  z-index: 2;
  padding: 10px;
  background: #000000ab;
  color: #5add65;
  font-size: 12px;
  margin-right: 20px;
`;

const Wrapper = styled.div`
  padding: 10px 35px;
  position: relative;
  z-index: 2;
  max-width: 1012px;
  margin: 0 auto;
  margin-top: 150px;
`;

const BoxWrapper = styled.div`
  padding: 10px 35px;
  position: relative;
  z-index: 2;
  max-width: 1012px;
  margin: 0 auto;
  background: #fff;
  margin-top: 25px;
`;

const Description = styled.p`
  font-size: 13px;
  font-family: 'Fredoka', sans-serif; ;
`;

export default Anime;
