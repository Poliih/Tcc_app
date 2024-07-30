import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChartComponent = () => {
  // Dados de consumo fictícios (em kWh)
  const consumo = [210000, 200000, 186000, 204000, 182000, 190000, 208000, 206000, 224000];

  // Calcula os dados de injetado como 90% do consumo
  const injetado = consumo.map(value => Math.round(value * 0.9));

  const options = {
    series: [
      {
        name: 'Geração',
        data: [220000, 200000, 210000, 180000, 190000, 208000, 230000, 220000, 210000]
      },
      {
        name: 'Consumo',
        data: consumo
      },
      {
        name: 'Injetado',
        data: injetado
      }
    ],
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out']
    },
    yaxis: {
      title: {
        text: 'Energia (kWh)'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val.toLocaleString() + " kWh";
        }
      }
    }
  };

  return (
    <div id="apex-chart">
      <ReactApexChart options={options} series={options.series} type="bar" height={350} />
    </div>
  );
};

export default ApexChartComponent;
