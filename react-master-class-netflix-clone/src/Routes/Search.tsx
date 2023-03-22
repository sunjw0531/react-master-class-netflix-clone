import {
  PathMatch,
  useLocation,
  useMatch,
  useNavigate,
} from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  IOtherMoviesResult,
  searchMovie,
  ISearch,
  ITVonair,
  searchTV,
} from '../api';
import styled from 'styled-components';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion';
import { makeImagePath } from '../utils';
import { useState } from 'react';

const Keyword = styled.h1`
  font-size: 40px;
  margin: 200px 0 20px 10px;
`;

const Resultlist = styled.div`
  display: grid;
  gap: 7px;
  grid-row-gap: 50px;
  grid-template-columns: repeat(6, 1fr);
  // position: absolute;
  width: 100%;
`;

const SearchResult = styled(motion.div)<{ bgimage: string }>`
  height: 150px;
  background-image: url(${(props) => props.bgimage});
  background-size: cover;
  background-position: center center;
  border-radius: 3px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const MovieInfo = styled(motion.div)`
  background-color: ${(props) => props.theme.black.veryDark};
  opacity: 0;
  font-size: 13px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -30%);
  padding: 5px 10px;
`;

const MovieModal = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 98;
`;

const MovieDetail = styled(motion.div)`
  background-color: ${(props) => props.theme.black.lighter};
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  z-index: 99;
`;

const Detailimage = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center;
`;

const DetailTitle = styled.div`
  margin: 20px;
  font-size: 30px;
  display: flex;
  align-items: center;
`;

const DetailAirdate = styled.span`
  font-size: 15px;
  color: ${(props) => props.theme.red};
  margin-left: 10px;
  background-color: ${(props) => props.theme.white.darker};
  padding: 2px;
  border-radius: 5px;
  font-weight: bold;
`;
const DetailCountry = styled(DetailAirdate)``;

const DetailOverview = styled.p`
  margin: 20px;
  font-size: 15px;
`;

const movievariants = {
  initial: { scale: 1 },
  animate: {
    transition: { delay: 0.5 },
    scale: 1.5,
  },
  exit: {},
};
const infovariants = {
  animate: {
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');

  const { data } = useQuery<IOtherMoviesResult>(
    ['SearchMovie', keyword],
    searchMovie
  );

  const { data: SearchTV } = useQuery<ITVonair>(
    ['SearchTV', keyword],
    searchTV
  );
  const [showDetail, setShowDetail] = useState(false);
  const navigate = useNavigate();
  const movieClicked = (id: number) => {
    setShowDetail(true);
    navigate(`movies/${id}`);
  };

  const tvClicked = (id: number) => {
    setShowDetail(true);
    navigate(`tv/${id}`);
  };
  const urlNowMovie: PathMatch<string> | null = useMatch(`/movies/:movieId`);
  const urlNowTV: PathMatch<string> | null = useMatch(`/tv/:tvId`);
  const findMatchedMovie =
    urlNowMovie?.params.movieId &&
    data?.results.find(
      (movie: any) => movie.id + '' === urlNowMovie?.params.movieId
    );
  const findMatchedTV =
    urlNowTV?.params.tvId &&
    data?.results.find((tv: any) => tv.id + '' === urlNowTV?.params.tvId);

  const { scrollY } = useScroll();
  const setScrollY = useTransform(scrollY, (value : any) => value + 100);

  return (
    <>
      <Keyword>{`'${keyword}' 로 검색한 영화`}</Keyword>
      <Resultlist>
        {data?.results.map((movie) => {
          return (
            movie.backdrop_path && (
              <AnimatePresence>
                <SearchResult
                  bgimage={
                    movie.backdrop_path
                      ? makeImagePath(movie.backdrop_path, 'w500')
                      : makeImagePath(movie.poster_path, 'w500')
                  }
                  key={movie.id}
                  layoutId={movie.id+''}
                  transition={{ type: 'tween' }}
                  variants={movievariants}
                  whileHover="animate"
                  onClick={() => movieClicked(movie.id)}
                >
                  <MovieInfo variants={infovariants}>{movie.title}</MovieInfo>
                </SearchResult>
              </AnimatePresence>
            )
          );
        })}
      </Resultlist>
      <Keyword>{`'${keyword}' 로 검색한 TV 프로그램`}</Keyword>
      <Resultlist>
        {SearchTV?.results.map((tv) => {
          return (
            tv.backdrop_path && (
              <AnimatePresence>
                <SearchResult
                  bgimage={
                    tv.backdrop_path
                      ? makeImagePath(tv.backdrop_path, 'w500')
                      : makeImagePath(tv.poster_path, 'w500')
                  }
                  key={tv.id}
                  layoutId={tv.id+''}
                  transition={{ type: 'tween' }}
                  variants={movievariants}
                  whileHover="animate"
                  onClick={() => tvClicked(tv.id)}
                >
                  <MovieInfo variants={infovariants}>{tv.name}</MovieInfo>
                </SearchResult>
              </AnimatePresence>
            )
          );
        })}
        <AnimatePresence>
          {findMatchedMovie && (
            <MovieDetail
              style={{ top: setScrollY }}
              layoutId={urlNowMovie?.params.movieId + ''}
            >
              <Detailimage
                style={{
                  backgroundImage: `linear-gradient(to top, black, transparent),url(${makeImagePath(
                    findMatchedMovie.backdrop_path
                  )})`,
                }}
              />
              <DetailTitle>
                {findMatchedMovie.title}
                <DetailAirdate>
                  {findMatchedMovie.release_date.slice(0, 4)}
                </DetailAirdate>
                <DetailCountry>
                  {findMatchedMovie.original_language}
                </DetailCountry>
              </DetailTitle>
              <DetailOverview>
                {findMatchedMovie.overview
                  ? findMatchedMovie.overview
                  : 'No Overview'}
              </DetailOverview>
            </MovieDetail>
          )}
        </AnimatePresence>
      </Resultlist>

      <AnimatePresence>
        {findMatchedTV && (
          <MovieDetail
            style={{ top: setScrollY }}
            layoutId={urlNowMovie?.params.movieId+''}
          >
            <Detailimage
              style={{
                backgroundImage: `linear-gradient(to top, black, transparent),url(${makeImagePath(
                  findMatchedTV.backdrop_path
                )})`,
              }}
            />
            <DetailTitle>
              {findMatchedTV.title}
              <DetailAirdate>
                {findMatchedTV.release_date.slice(0, 4)}
              </DetailAirdate>
              <DetailCountry>{findMatchedTV.original_language}</DetailCountry>
            </DetailTitle>
            <DetailOverview>
              {findMatchedTV.overview ? findMatchedTV.overview : 'No Overview'}
            </DetailOverview>
          </MovieDetail>
        )}
      </AnimatePresence>
    </>
  );
}

export default Search;
