import * as React from 'react';
import type { Stats } from '../utils/types';

interface Props {
  data: Stats;
}

const DataDisplay = ({ data }: Props): JSX.Element => {
  return (
    <>
      <p>{`Platform: ${data.cpu_platform}.`}</p>
      <p>{`CPU core count: ${data.core_count}.`}</p>
    </>
  );
}

export default DataDisplay;