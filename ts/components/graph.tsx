import * as React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import styled from 'styled-components';
import type { HistoricStats } from '../utils/types';

Chart.register(...registerables);

interface Props {
  title: string;
  history: HistoricStats[];
  dataKey: string;
}

const ChartContainer = styled.div`
  min-width: 0;
`;

const Graph = (props: Props) => {
  const chartOptions = {
    responsive: true,
    backgroundColor: '#FFF',
    borderColor: '#FFF',
    scales: {
      x: {
        grid: {
          color: '#FFF'
        },
        ticks: {
          color: '#FFF'
        }
      },
      y: {
        grid: {
          color: '#FFF'
        },
        ticks: {
          color: '#FFF'
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: props.title,
        color: '#FFF'
      },
      legend: {
        display: false
      }
    }
  }

  return (
    <ChartContainer>
      <Line
        data={{
          labels: props.history.map(d => d.timestamp),
          datasets: [
            {
              data: props.history.map(d => d[props.dataKey as keyof HistoricStats])
            }
          ]
        }}
        options={chartOptions}
      />
    </ChartContainer>
  );

}

export default Graph;