import * as React from 'react';
import type { Stats } from './utils/types';

const App = (): JSX.Element => {
  const [ stats, setStats ] = React.useState<Stats>({});

  const getStats = async() => {
    const response = await fetch('http://localhost:3000/get_stats');

    if (response.ok) {
      const data = await response.json();
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
          (
            <>
              <p>{`Platform: ${stats.cpu_platform}.`}</p>
              <p>{`CPU core count: ${stats.core_count}.`}</p>
            </>
          ) : null
      }
    </>
  );
};

export default App;