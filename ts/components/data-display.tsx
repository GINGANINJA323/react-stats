import * as React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import styled from 'styled-components';
import type { Stats } from '../utils/types';

interface Props {
  data: Stats;
}

const DataContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  grid-column: 2;
  grid-row: 2;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
`;

const DataDisplay = ({ data }: Props): JSX.Element => {
  const memoryInUse = Math.round(data.freemem.totalMemMb) - Math.round(data.freemem.freeMemMb);

  const getEvenMemorySegments = (totalMemory: number): Array<number> => {
    const segmentNumbers = [0];

    for (let i = 0; i < 5; i++) {
      const segmentNum = Math.round(totalMemory) / 5 * i;
      segmentNumbers.push(Math.round(segmentNum));
    }

    segmentNumbers.push(Math.round(totalMemory));

    return segmentNumbers;
  }

  const formatDuration = (time: number): string => {
    const baseDate = new Date(1970, 1, 1);
    baseDate.setSeconds(time);
    console.log('Time: ', baseDate.toISOString());
    const day = Number(baseDate.toISOString().substring(9, 10)) - 1;
    return `${day}:${baseDate.toISOString().substring(11, 19)}`;
  }

  return (
    <DataContainer>
      <ReactSpeedometer
        minValue={0}
        maxValue={100}
        value={data.usage}
        currentValueText={`CPU Usage: ${data.usage}%`}
      />
      <Row>
        <p>{`CPU Model: ${data.cpu_platform}.`}</p>
        <p>{`CPU core count: ${data.core_count}.`}</p>
        <p>{`Server uptime: ${formatDuration(data.uptime)}.`}</p>
      </Row>
      <ReactSpeedometer
        minValue={0}
        maxValue={Math.round(data.freemem.totalMemMb)}
        value={memoryInUse}
        currentValueText={`RAM Usage: ${memoryInUse} Mb in use.`}
      />
    </DataContainer>
  );
}

export default DataDisplay;