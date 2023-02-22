import { useQuery } from 'react-query';
import { getTVonair, ITVonair } from '../api';
import TVBanner from './Components/TV/TVBanner';
import TVSlider from './Components/TV/TVSlider';
function Tv() {
  const { data: TVonair, isLoading } = useQuery<ITVonair>(
    'TVonair',
    getTVonair
  );
  return (
    <>
      <TVBanner />
      <TVSlider data={TVonair as ITVonair} />
    </>
  );
}

export default Tv;
