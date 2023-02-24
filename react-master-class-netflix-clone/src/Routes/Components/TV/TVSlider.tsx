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
  background-color: red;
  display: flex;
  position: relative;
`;

const TVProgram = styled(motion.div)<{ bgimage: string }>`
  width: 500px;
  height: 200px;
  background-image: url(${(props) => props.bgimage});
  background-size: cover;
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
  hidden: { x: window.outerWidth + 5 },
  show: { x: 0 },
  exit: { x: -window.outerWidth - 5 },
};

export default function TVSlider({ data, category }: IProp) {
  console.log(data?.results);
  // index change
  const [index, setIndex] = useState(0);
  const prevIndex = () => {
    if (index === 0) {
      setIndex(page);
    } else {
      setIndex((prev) => prev - 1);
    }
  };
  const nextIndex = () => {
    if (index === page) {
      setIndex(0);
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  const page = Math.floor(data?.results.length / contentperpage);
  console.log(index);
  return (
    <>
      <TVTitle>{category}</TVTitle>
      <AnimatePresence>
        <Slider
          variants={sliderVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          transition={{ type: 'tween', duration: 1 }}
          key={category + index}
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
                  bgimage={makeImagePath(tv.backdrop_path)}
                  key={tv.id}
                >
                  {contentperpage}
                </TVProgram>
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
    </>
  );
}
