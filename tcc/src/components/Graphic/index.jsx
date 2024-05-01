// components/Graphic/index.jsx
import React, { useRef, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { generateRandomMonths, generateRandomKwh } from '../GeradorDados/GBD';

const Graphic = () => {
  const chartRef = useRef(null);
  const dates = generateRandomMonths();
  const kwh = generateRandomKwh();

  useEffect(() => {
    let chartInstance = null;

    const createOrUpdateChart = () => {
      if (chartInstance) {
        chartInstance.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: dates,
          datasets: [
            {
              label: 'kWh x Mês',
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(75,192,192,0.4)',
              hoverBorderColor: 'rgba(75,192,192,1)',
              data: kwh,
            },
          ],
        },
      });
    };

    createOrUpdateChart();

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="chart-container">
      <canvas ref={chartRef} />
    </div>
  );
};

export default Graphic;
