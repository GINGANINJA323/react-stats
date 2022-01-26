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
      <p>{`CPU usage: ${data.usage}.`}</p>
      <p>{`RAM: ${data.freemem}/${data.totalmem}.`}</p>
      <p>{`Server uptime: ${data.uptime}.`}</p>
    </>
  );
}

export default DataDisplay;