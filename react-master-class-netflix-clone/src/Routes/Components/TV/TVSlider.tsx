import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';
import { ITVonair } from '../../../api';
import { makeImagePath } from '../../../utils';

interface IProp {
  data: ITVonair;
  category: string;
}

const contentperpage = 6;

const TVTitle = styled.h1`
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
  border-radius: 3px;
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

export default function TVSlider({ data, category }: IProp) {
  console.log(data?.results);
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
  console.log(index);
  return (
    <div style={{ marginBottom: '220px' }}>
      <TVTitle>{category}</TVTitle>
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
                <TVProgram
                  bgimage={
                    tv.backdrop_path
                      ? makeImagePath(tv.backdrop_path, 'w500')
                      : makeImagePath(tv.poster_path, 'w500')
                  }
                  key={tv.id}
                ></TVProgram>
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
    </div>
  );
}
