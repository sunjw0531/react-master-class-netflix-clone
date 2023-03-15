import { useQuery } from 'react-query';
import styled from 'styled-components';
import {
  getLatestMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpComingMovies,
  IGetLatestMovies,
  IGetMoviesResult,
  IOtherMoviesResult,
} from '../api';
import { makeImagePath } from '../utils';
import HomeSliderNowPlaying from './Components/Home/HomeSliderNowPlaying';
import HomeSliderOther from './Components/Home/HomeSliderOther';
const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const OverView = styled.p`
  font-size: 30px;
  width: 50%;
`;

function Home() {
  // 'usequery' for get datas from api
  const { data, isLoading } = useQuery<IGetLatestMovies>(
    'LatestMovie',
    getLatestMovies
  );
  const { data: MoviesNowPlaying } = useQuery<IGetMoviesResult>(
    'MoviesNowPlaying',
    getNowPlayingMovies
  );
  const { data: TopRatedMovies } = useQuery<IOtherMoviesResult>(
    'TopRatedMovies',
    getTopRatedMovies
  );
  const { data: UpcomingMovies } = useQuery<IGetMoviesResult>(
    'UpcomingMovies',
    getUpComingMovies
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgphoto={makeImagePath(data?.backdrop_path || '')}>
            <Title>{data?.title}</Title>
            <OverView>
              {data?.overview || 'This movie does not have overview'}
            </OverView>
          </Banner>
          <HomeSliderNowPlaying
            data={MoviesNowPlaying as IGetMoviesResult}
            category="NowPlaying"
          />
          <HomeSliderOther
            data={TopRatedMovies as IOtherMoviesResult}
            category="TopRated"
          />
          <HomeSliderNowPlaying
            data={UpcomingMovies as IGetMoviesResult}
            category="UpComing"
          />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
