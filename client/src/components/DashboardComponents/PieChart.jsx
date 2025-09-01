import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ income, expenses, balance }) => {
  const data = {
    labels: ['Income', 'Expenses', 'Balance'],
    datasets: [
      {
        label: 'Money Flow',
        data: [income, expenses, balance],
        backgroundColor: [
          '#0081A7',   // Income - teal
          'rgba(255, 1, 56, 0.8)',   // Expenses - red
          'rgba(255, 206, 86, 0.6)',   // Balance - yellow
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default PieChart;
