import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useState } from 'react';
import { PathMatch, useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ITVonair } from '../../../api';
import { makeImagePath } from '../../../utils';

interface IProp {
  data: ITVonair;
  category: string;
}

const contentperpage = 6;

const TVCategory = styled.h1`
  font-size: 50px;
`;

const Slider = styled(motion.div)`
  display: grid;
  gap: 7px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const TVProgram = styled(motion.div)<{ bgimage: string }>`
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

const TVInfo = styled(motion.div)`
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
`;
const NextBtn = styled(motion.div)`
  background-color: pink;
  position: absolute;
  right: 0;
  width: 50px;
  height: 50px;
  bottom: 0;
  height: 100%;
`;

const TVModal = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const TVDetail = styled(motion.div)`
  background-color: ${(props) => props.theme.black.lighter};
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
`;

const TVimage = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center;
`;

const TVTitle = styled.div`
  margin: 20px;
  font-size: 30px;
  display: flex;
  align-items: center;
`;

const TVAirdate = styled.span`
  font-size: 15px;
  color: ${(props) => props.theme.red};
  margin-left: 10px;
  background-color: ${(props) => props.theme.white.darker};
  padding: 2px;
  border-radius: 5px;
  font-weight: bold;
`;
const TVCountry = styled(TVAirdate)``;

const TVOverview = styled.p`
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

const tvprogramvariants = {
  initial: { scale: 1 },
  animate: {
    transition: { delay: 0.5 },
    // scaleX: 1.2,
    // scaleY: 1.6,
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

export default function TVSlider({ data, category }: IProp) {
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
  const tvClicked = (id: number) => {
    setShowDetail(true);
    navigate(`${id}`);
  };
  // show detail
  const urlNow: PathMatch<string> | null = useMatch(`/tv/:tvId`);
  const findMatchedProgram =
    urlNow?.params.tvId &&
    data?.results.find((tv: any) => tv.id + '' === urlNow?.params.tvId);
  console.log(findMatchedProgram);
  const { scrollY } = useScroll();
  const setScrollY = useTransform(scrollY, (value) => value + 100);
  return (
    <div style={{ marginBottom: '220px' }}>
      <TVCategory>{category}</TVCategory>
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
          />
          {data?.results
            .slice(
              index * contentperpage,
              index * contentperpage + contentperpage
            )
            .map((tv) => {
              return (
                <AnimatePresence>
                  <TVProgram
                    bgimage={
                      tv.backdrop_path
                        ? makeImagePath(tv.backdrop_path, 'w500')
                        : makeImagePath(tv.poster_path, 'w500')
                    }
                    key={tv.id + category}
                    transition={{ type: 'tween' }}
                    variants={tvprogramvariants}
                    whileHover="animate"
                    onClick={() => tvClicked(tv.id)}
                    layoutId={tv.id + category}
                  >
                    <TVInfo variants={infovariants}>{tv.name}</TVInfo>
                  </TVProgram>
                </AnimatePresence>
              );
            })}
          <NextBtn
            onClick={nextIndex}
            variants={btnVariants}
            animate="hidden"
            whileHover="show"
          />
        </Slider>
      </AnimatePresence>
      <AnimatePresence>
        {showDetail ? (
          <>
            <TVModal
              onClick={() => {
                navigate('/tv');
                setShowDetail(false);
              }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            {findMatchedProgram && (
              <TVDetail
                style={{ top: setScrollY }}
                layoutId={urlNow?.params.tvId + category}
              >
                <TVimage
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent),url(${makeImagePath(
                      findMatchedProgram.backdrop_path
                    )})`,
                  }}
                />
                <TVTitle>
                  {findMatchedProgram.name}
                  <TVAirdate>
                    {findMatchedProgram.first_air_date.slice(0, 4)}
                  </TVAirdate>
                  <TVCountry>{findMatchedProgram.origin_country}</TVCountry>
                </TVTitle>
                <TVOverview>
                  {findMatchedProgram.overview
                    ? findMatchedProgram.overview
                    : 'No Overview'}
                </TVOverview>
              </TVDetail>
            )}
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
