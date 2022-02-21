import * as React from 'react';
import DataDisplay from './components/data-display';
import styled from 'styled-components';
import { Chart, registerables } from 'chart.js';

import type { Stats, HistoricStats } from './utils/types';
import Graph from './components/graph';

Chart.register(...registerables);

const ContainerDiv = styled.div`
  display: grid;
  width: 100%;
  min-height: 100vh;
  grid-template-columns: 5% auto 5%;
  font-family: 'Titillium Web', sans-serif;
  font-weight: 400;
  background-color: #1A1A1A;
  color: #FFFFFF;

  h1 {
    font-family: 'Titillium Web', sans-serif;
    font-weight: 600;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  text-align: center;
  grid-row: 1;
  grid-column: 2;
  flex-direction: column;
`;

const FooterRow = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  grid-column: 2;
  grid-row: auto;
`;

const Loading = styled.h2`
  grid-row: 2;
  grid-column: 2;
`;

const ChartRow = styled.div`
  display: flex;
  grid-row: 3;
  grid-column: 2;
  flex-direction: row;
  justify-content: space-evenly;
`;

const App = (): JSX.Element => {
  const [ stats, setStats ] = React.useState<Stats>({
    cpu_platform: '',
    core_count: 0,
    freemem: {
      status: false,
      totalMemMb: 0,
      freeMemMb: 0
    },
    uptime: 0,
    usage: 0,
    freedisk: {
      status: false,
      totalGb: 0,
      freeGb: 0,
      usedGb: 0,
      usedPercentage: 0,
      freePercentage: 0
    },
    temps: {
      status: false,
      tempAvg: 0,
      tempCores: [0]
    }
  });

  const [history, setHistory] = React.useState<Array<HistoricStats>>([]);
  const baseUrl = window.location.origin;

  const getStats = async() => {
    const response = await fetch(`${baseUrl}/api/get_stats`);

    if (response.ok) {
      const data = await response.json();
      console.log('Stats: ', data);
      setStats(data);
    } else {
      console.log('Error fetching stats');
    }

    setTimeout(() => getStats(), 3000);
  }

  const getHistoricStats = async() => {
    const response = await fetch(`${baseUrl}/api/get_history`);

    if (response.ok) {
      const data = await response.json();
      console.log('History: ', data);
      setHistory(data);
    } else {
      console.log('Error fetching historic stats');
    }

    setTimeout(() => getHistoricStats(), 60000);
  }

  React.useEffect(() => {
    getStats();
  }, []);

  React.useEffect(() => {
    getHistoricStats();
  }, []);

  return (
    <ContainerDiv>
      <HeaderRow>
        <h1>{'React Server Statistics'}</h1>
      </HeaderRow>
      {
        stats.cpu_platform.length ?
          <DataDisplay data={stats} /> : <Loading>Content Loading...</Loading>
      }
      {
        history.length ? 
          <ChartRow>
            <Graph
              title={'CPU Usage'}
              history={history}
              dataKey={'usage'}
            />
            <Graph
              title={'RAM Usage'}
              history={history}
              dataKey={'ramUsage'}
            />
            <Graph
              title={'Disk Usage'}
              history={history}
              dataKey={'diskUsage'}
            />
          </ChartRow> : null
      }
      <FooterRow>
        <p>Created using <a target="_blank" rel="noopener noreferrer" href="https://reactjs.org/">ReactJS</a> and <a target="_blank" rel="noopener noreferrer" href="https://www.typescriptlang.org/">TypeScript</a>.</p>
        <p>Wanna see the code? Here's my <a target="_blank" rel="noopener noreferrer" href="https://github.com/GINGANINJA323/react-stats">repo</a>.</p>
      </FooterRow>
    </ContainerDiv>
  );
};

export default App;