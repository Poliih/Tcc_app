import React from 'react';
import ApexCharts from 'react-apexcharts';

const WeatherApexChart = ({ data }) => {
  // Estrutura dos dados para o gráfico
  const chartData = {
    series: [
      {
        name: 'Temperatura',
        data: data.map(item => item.temperature)  // Extrai os dados de temperatura do array de dados horários
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Previsão Horária de Temperatura',
        align: 'left'
      },
      xaxis: {
        categories: data.map(item => item.hour)  // Extrai as horas para o eixo X do gráfico
      }
    }
  };

  return (
    <div className="weather-chart">
      <ApexCharts options={chartData.options} series={chartData.series} type="line" height={350} />
    </div>
  );
};

export default WeatherApexChart;
