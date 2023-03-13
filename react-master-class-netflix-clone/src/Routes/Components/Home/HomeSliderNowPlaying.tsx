import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useState } from 'react';
import { PathMatch, useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IGetMoviesResult } from '../../../api';
import { makeImagePath } from '../../../utils';

interface IProp {
  data: IGetMoviesResult;
  category: string;
}

const contentperpage = 6;

const MovieCategory = styled.h1`
  font-size: 50px;
  margin-bottom: 10px;
`;

const Slider = styled(motion.div)`
  display: grid;
  gap: 7px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const MovieProgram = styled(motion.div)<{ bgimage: string }>`
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

const PrevBtn = styled(motion.div)`
  background-color: yellow;
  position: absolute;
  left: 0;
  width: 50px;
  height: 50px;
  bottom: 0;
  height: 100%;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  cursor: pointer;
`;
const NextBtn = styled(motion.div)`
  background-color: pink;
  position: absolute;
  right: 0;
  width: 50px;
  height: 50px;
  bottom: 0;
  height: 100%;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  cursor: pointer;
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

const Movieimage = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center;
`;

const MovieTitle = styled.div`
  margin: 20px;
  font-size: 30px;
  display: flex;
  align-items: center;
`;

const MovieAirdate = styled.span`
  font-size: 15px;
  color: ${(props) => props.theme.red};
  margin-left: 10px;
  background-color: ${(props) => props.theme.white.darker};
  padding: 2px;
  border-radius: 5px;
  font-weight: bold;
`;
const MovieCountry = styled(MovieAirdate)``;

const MovieOverview = styled.p`
  margin: 20px;
  font-size: 15px;
`;

const btnVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 0.7,
  },
};

const sliderVariants = {
  hidden: (next: boolean) => ({
    x: next ? window.outerWidth + 5 : -window.outerWidth - 5,
  }),
  show: { x: 0 },
  exit: (next: boolean) => ({
    x: next ? -window.outerWidth - 5 : window.outerWidth + 5,
  }),
};

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

export default function HomeSliderNowPlaying({ data, category }: IProp) {
  // index change
  const [index, setIndex] = useState(0);
  const prevIndex = () => {
    setNext(false);
    if (index === 0) {
      setIndex(page);
    } else {
      setIndex((prev) => prev - 1);
    }
  };
  const nextIndex = () => {
    setNext(true);
    if (index === page) {
      setIndex(0);
    } else {
      setIndex((prev) => prev + 1);
    }
  };
  const [next, setNext] = useState(true);
  const page = Math.floor(data?.results.length / contentperpage);

  // navigate page
  const [showDetail, setShowDetail] = useState(false);
  const navigate = useNavigate();
  const movieClicked = (id: number) => {
    setShowDetail(true);
    navigate(`movies/${id}`);
  };
  // show detail
  const urlNow: PathMatch<string> | null = useMatch(`/movies/:movieId`);
  const findMatchedMovie =
    urlNow?.params.movieId &&
    data?.results.find(
      (movie: any) => movie.id + '' === urlNow?.params.movieId
    );
  console.log(findMatchedMovie);
  const { scrollY } = useScroll();
  const setScrollY = useTransform(scrollY, (value) => value + 100);
  return (
    <div style={{ marginBottom: '220px' }}>
      <MovieCategory>{category}</MovieCategory>
      <AnimatePresence initial={false} custom={next}>
        <Slider
          custom={next}
          variants={sliderVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          transition={{ type: 'tween', duration: 1 }}
          key={index}
        >
          <PrevBtn
            onClick={prevIndex}
            variants={btnVariants}
            animate="hidden"
            whileHover="show"
          >
            ◀
          </PrevBtn>
          {data?.results
            .slice(
              index * contentperpage,
              index * contentperpage + contentperpage
            )
            .map((movie) => {
              return (
                <AnimatePresence>
                  <MovieProgram
                    bgimage={
                      movie.backdrop_path
                        ? makeImagePath(movie.backdrop_path, 'w500')
                        : makeImagePath(movie.poster_path, 'w500')
                    }
                    key={movie.id + category}
                    transition={{ type: 'tween' }}
                    variants={movievariants}
                    whileHover="animate"
                    onClick={() => movieClicked(movie.id)}
                    layoutId={movie.id + category}
                  >
                    <MovieInfo variants={infovariants}>{movie.title}</MovieInfo>
                  </MovieProgram>
                </AnimatePresence>
              );
            })}
          <NextBtn
            onClick={nextIndex}
            variants={btnVariants}
            animate="hidden"
            whileHover="show"
          >
            ▶
          </NextBtn>
        </Slider>
      </AnimatePresence>
      <AnimatePresence>
        {showDetail ? (
          <>
            <MovieModal
              onClick={() => {
                navigate('/');
                setShowDetail(false);
              }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            {findMatchedMovie && (
              <MovieDetail
                style={{ top: setScrollY }}
                layoutId={urlNow?.params.movieId + category}
              >
                <Movieimage
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent),url(${makeImagePath(
                      findMatchedMovie.backdrop_path
                    )})`,
                  }}
                />
                <MovieTitle>
                  {findMatchedMovie.title}
                  <MovieAirdate>
                    {findMatchedMovie.release_date.slice(0, 4)}
                  </MovieAirdate>
                  <MovieCountry>
                    {findMatchedMovie.original_language}
                  </MovieCountry>
                </MovieTitle>
                <MovieOverview>
                  {findMatchedMovie.overview
                    ? findMatchedMovie.overview
                    : 'No Overview'}
                </MovieOverview>
              </MovieDetail>
            )}
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
