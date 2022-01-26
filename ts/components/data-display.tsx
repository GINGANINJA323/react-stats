import * as React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import styled from 'styled-components';
import type { Stats } from '../utils/types';

interface Props {
  data: Stats;
}

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 2;
  grid-row: 2;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const DataDisplay = ({ data }: Props): JSX.Element => {
  return (
    <DataContainer>
      <Row>
        <ReactSpeedometer
          minValue={0}
          maxValue={100}
          value={data.usage}
          currentValueText={`CPU Usage: ${data.usage}%`}
        />
        <ReactSpeedometer
          minValue={0}
          maxValue={data.freemem?.totalMemMb}
          value={data.freemem?.freeMemMb}
          currentValueText={`RAM Usage: ${data.freemem?.freeMemMb}.`}
        />
      </Row>
      <p>{`CPU Model: ${data.cpu_platform}.`}</p>
      <p>{`CPU core count: ${data.core_count}.`}</p>
      <p>{`Server uptime: ${data.uptime}.`}</p>
    </DataContainer>
  );
}

export default DataDisplay;