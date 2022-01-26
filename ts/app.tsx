import * as React from 'react';
import DataDisplay from './components/data-display';
import styled from 'styled-components';
import type { Stats } from './utils/types';

const ContainerDiv = styled.div`
  display: grid;
  width: 100%;
  height: 100vh;
  grid-template-columns: 5% auto 5%;
  font-family: 'Titillium Web', sans-serif;
  font-weight: 400;

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

const App = (): JSX.Element => {
  const [ stats, setStats ] = React.useState<Stats>({});

  const getStats = async() => {
    const response = await fetch('http://localhost:3000/get_stats');

    if (response.ok) {
      const data = await response.json();
      console.log('Stats: ', data);
      setStats(data);
    } else {
      console.log('Error fetching stats');
    }

    setTimeout(() => getStats(), 60000);
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
        Object.keys(stats).length ?
          <DataDisplay data={stats} /> : null
      }
    </ContainerDiv>
  );
};

export default App;