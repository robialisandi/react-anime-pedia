/** @jsxImportSource @emotion/react */
import { useQuery } from '@apollo/client';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoadingIcon from '../../components/LoadingIcon';
import { addToCollection } from '../../features/collections/collectionsSlice';
import { GET_ANIME_BY_ID } from '../../queries';

const Anime = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState({});
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

  const handleCollections = anime => {
    console.log('click');
    console.log('masuk data', anime);
    dispatch(addToCollection(anime));
  };

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
          <div>
            <Title>{anime?.title?.romaji}</Title>
            <button onClick={() => handleCollections({ id: '1', data: anime })}>
              Add Collection
            </button>
          </div>
          <SubTitle>
            Popular {anime?.popularity} | favourites {anime?.favourites}
          </SubTitle>
        </Header>
        <BoxWrapper>
          <Description
            dangerouslySetInnerHTML={{
              __html: anime.description || 'No Description',
            }}
          ></Description>
        </BoxWrapper>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  margin-top: 37px;
`;

const Banner = styled.div`
  background-position: 50% 35%;
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
  justify-content: space-between;
  display: flex;
`;

const Title = styled.span`
  z-index: 2;
  padding: 10px;
  background: #ffffffab;
  font-weight: bold;
`;
const SubTitle = styled.span`
  z-index: 2;
  padding: 10px;
  background: #000000ab;
  color: #5add65;
  font-size: 12px;
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
