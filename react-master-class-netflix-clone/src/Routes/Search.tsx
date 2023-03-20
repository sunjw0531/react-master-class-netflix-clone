import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  IOtherMoviesResult,
  searchMovie,
  ISearch,
  ITVonair,
  searchTV,
} from '../api';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
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

  const { data, isLoading } = useQuery<IOtherMoviesResult>(
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
                  transition={{ type: 'tween' }}
                  variants={movievariants}
                  whileHover="animate"
                  onClick={() => movieClicked(tv.id)}
                >
                  <MovieInfo variants={infovariants}>{tv.name}</MovieInfo>
                </SearchResult>
              </AnimatePresence>
            )
          );
        })}
      </Resultlist>
    </>
  );
}

export default Search;
