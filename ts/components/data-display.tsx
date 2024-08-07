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

  const speedoColours = [
    '#6ad72d',
    '#aee228',
    '#ecdb23',
    '#f6961e',
    '#ff471a'
  ];

  const formatDuration = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - (hours * 3600)) / 60);
    const seconds = Math.floor(time - (hours * 3600) - (minutes * 60));

    const timeStrings = {
      hoursString: `${hours}`,
      minutesString: `${minutes}`,
      secondsString: `${seconds}`
    }

    if (hours < 10) {
      timeStrings.hoursString = `0${hours}`;
    }
    if (minutes < 10) {
      timeStrings.minutesString = `0${minutes}`;
    }
    if (seconds < 10) {
      timeStrings.secondsString = `0${seconds}`;
    }
    return `${timeStrings.hoursString}:${timeStrings.minutesString}:${timeStrings.secondsString}`;
  }

  return (
    <DataContainer>
      {
        typeof data.usage === 'number' ?
          <ReactSpeedometer
            minValue={0}
            maxValue={100}
            value={data.usage}
            currentValueText={`CPU Usage: ${data.usage}%`}
            segmentColors={speedoColours}
          /> :
          <p>{data.usage}</p>
      }
      <Row>
        <p>{`CPU Model: ${data.cpu_platform}.`}</p>
        <p>{`CPU core count: ${data.core_count}.`}</p>
        <p>{`Server uptime: ${formatDuration(data.uptime)} (HH:MM:SS).`}</p>
        {
          data.freedisk.status ?
          <p>{`Disk usage: ${data.freedisk.usedPercentage}% used (${data.freedisk.freeGb}Gb/${data.freedisk.totalGb}Gb free).`}</p>
          : null
        }
        {
          data.temps.status && data.temps.tempAvg ? 
          <>
            <p>{`CPU Temperature: ${data.temps.tempAvg}°C.`}</p>
            {
              data.temps.tempCores.map((t, i) => (
                <p key={i}>{`CPU Core ${i+1} Temperature: ${t}°C.`}</p>
              ))
            }
          </> : null
        }
      </Row>
      {
        data.freemem.status ?
          <ReactSpeedometer
            minValue={0}
            maxValue={Math.round(data.freemem.totalMemMb)}
            value={memoryInUse}
            currentValueText={`RAM Usage: ${memoryInUse} Mb in use.`}
            segmentColors={speedoColours}
          /> : null
      }
    </DataContainer>
  );
}

export default DataDisplay;