import * as React from 'react';
import DataDisplay from './components/data-display';
import styled from 'styled-components';
import type { Stats } from './utils/types';

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
    }
  });

  const getStats = async() => {
    const response = await fetch('http://localhost:3000/get_stats');

    if (response.ok) {
      const data = await response.json();
      console.log('Stats: ', data);
      setStats(data);
    } else {
      console.log('Error fetching stats');
    }

    setTimeout(() => getStats(), 3000);
  }

  React.useEffect(() => {
    getStats();
  }, []);

  return (
    <ContainerDiv>
      <HeaderRow>
        <h1>{'Welcome to React Stats!'}</h1>
      </HeaderRow>
      {
        stats.cpu_platform.length ?
          <DataDisplay data={stats} /> : <Loading>Content Loading...</Loading>
      }
      <FooterRow>
        <p>Created using <a target="_blank" rel="noopener noreferrer" href="https://reactjs.org/">ReactJS</a> and <a target="_blank" rel="noopener noreferrer" href="https://www.typescriptlang.org/">TypeScript</a>.</p>
        <p>Wanna see the code? Here's my <a target="_blank" rel="noopener noreferrer" href="https://github.com/GINGANINJA323/react-stats">repo</a>.</p>
      </FooterRow>
    </ContainerDiv>
  );
};

export default App;