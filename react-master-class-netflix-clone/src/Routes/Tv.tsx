import { useQuery } from 'react-query';
import { getTVonair, getTVtoprated, ITVonair } from '../api';
import TVBanner from './Components/TV/TVBanner';
import TVSlider from './Components/TV/TVSlider';
function Tv() {
  const { data: TVonair, isLoading } = useQuery<ITVonair>(
    'TVonair',
    getTVonair
  );
  const { data: TVtoprated } = useQuery<ITVonair>('TVtoprated', getTVtoprated);
  return (
    <>
      <TVBanner />
      <TVSlider data={TVonair as ITVonair} category="On Air" />
      <TVSlider data={TVtoprated as ITVonair} category="Top Rated" />
    </>
  );
}

export default Tv;
