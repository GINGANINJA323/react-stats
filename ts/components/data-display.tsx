import * as React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import type { Stats } from '../utils/types';

interface Props {
  data: Stats;
}

const DataDisplay = ({ data }: Props): JSX.Element => {
  return (
    <>
      <p>{`CPU Model: ${data.cpu_platform}.`}</p>
      <p>{`CPU core count: ${data.core_count}.`}</p>
      <ReactSpeedometer
        minValue={0}
        maxValue={100}
        value={data.usage}
        currentValueText={`CPU Usage: ${data.usage}%`}
      />
      <p>{`RAM: ${data.freemem?.freeMemMb}/${data.freemem?.totalMemMb}.`}</p>
      <ReactSpeedometer
        minValue={0}
        maxValue={data.freemem?.totalMemMb}
        value={data.freemem?.freeMemMb}
        currentValueText={`RAM Usage: ${data.freemem?.freeMemMb}.`}
      />
      <p>{`Server uptime: ${data.uptime}.`}</p>
    </>
  );
}

export default DataDisplay;