import * as React from 'react';
import axios from 'axios';

export const App = (): JSX.Element => {
  const getStats = async() => {
    return axios.get('http://localhost:3000/get_stats')
      .then((response) => console.log('Data: ', response))
      .catch((error) => console.log('Error: ', error));
  }

  return (
    <>
      <h1>{'Welcome to React Stats!'}</h1>
      <button onClick={() => getStats()}>{'Call API!'}</button>
    </>
  );
}