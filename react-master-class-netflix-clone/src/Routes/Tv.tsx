import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getTVonair, getTVpopular, getTVtoprated, ITVonair } from '../api';
import TVBanner from './Components/TV/TVBanner';
import TVSlider from './Components/TV/TVSlider';
function Tv() {
  const { data: TVonair, isLoading } = useQuery<ITVonair>(
    'TVonair',
    getTVonair
  );
  const { data: TVtoprated } = useQuery<ITVonair>('TVtoprated', getTVtoprated);
  const { data: TVpopular } = useQuery<ITVonair>('TVpopular', getTVpopular);
  return (
    <>
      <TVBanner />
      <TVSlider data={TVonair as ITVonair} category="On Air" />
      <TVSlider data={TVtoprated as ITVonair} category="Top Rated" />
      <TVSlider data={TVpopular as ITVonair} category="Popular" />
    </>
  );
}

export default Tv;
