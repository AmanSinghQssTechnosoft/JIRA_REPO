import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import "./chart.scss"


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarData = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        label: 'Sale by Ram',
        data: [30, 50, 70, 40],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Sale by Shyam',
        data: [20, 35, 45, 25],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
    scales: {
      x: {
        stacked: true,
        beginAtZero: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

return (
  <div className='bardata'>
    <Bar data={data} options={options} />
  </div>
);

};

export default BarData;
