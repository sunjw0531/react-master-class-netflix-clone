import { motion } from 'framer-motion';
import { ITVonair } from '../../../api';

interface IProp {
  data: ITVonair;
}

export default function TVSlider({ data }: IProp) {
  console.log(data?.results);
  return <></>;
}
