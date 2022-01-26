import * as React from 'react';
import DataDisplay from './components/data-display';
import type { Stats } from './utils/types';

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
    <>
      <h1>{'Welcome to React Stats!'}</h1>
      <h2>{'System Info:'}</h2>
      {
        Object.keys(stats).length ?
          <DataDisplay data={stats} /> : null
      }
    </>
  );
};

export default App;