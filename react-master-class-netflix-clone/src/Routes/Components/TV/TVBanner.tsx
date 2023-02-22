import { useQuery } from 'react-query';
import { getTVonair, ITVonair } from '../../../api';
import styled from 'styled-components';
import { makeImagePath } from '../../../utils';
const Banner = styled.div<{ bgURL: string }>`
  height: 100vh;
  // background-color: yellow;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgURL});
  background-size: cover;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 68px;
  margin-top: 230px;
  margin-bottom: 30px;
`;
const Overview = styled.p`
  font-size: 30px;
  width: 40%;
`;

export default function TVBanner() {
  const { data, isLoading } = useQuery<ITVonair>('TVonair', getTVonair);
  console.log(data?.results[0].backdrop_path);
  return (
    <>
      <Banner bgURL={makeImagePath(data?.results[0].backdrop_path || '')}>
        <Title>{data?.results[0].name}</Title>
        <Overview>{data?.results[0].overview}</Overview>
      </Banner>
    </>
  );
}
