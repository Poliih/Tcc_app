import React from 'react';
import ReactApexChart from 'react-apexcharts';
import './styles.css';

const WeatherApexChart = ({ data }) => {
  const chartOptions = {
    series: [
      {
        name: "Precipitação",
        data: data.map(d => d.precipitation)
      },
      {
        name: "Umidade",
        data: data.map(d => d.humidity)
      },
      {
        name: 'Temperatura',
        data: data.map(d => d.temperature)
      }
    ],
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: [5, 7, 5],
      curve: 'straight',
      dashArray: [0, 8, 5]
    },
    title: {
      text: 'Condições Diárias 22/06/2023 - GOIANESIA-GO',
      align: 'left'
    },
    legend: {
      tooltipHoverFormatter: function(val, opts) {
        return val + ' - <strong>' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + '</strong>'
      }
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6
      }
    },
    xaxis: {
      categories: data.map(d => d.hour),
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val) {
              return val + " mm"
            }
          }
        },
        {
          title: {
            formatter: function (val) {
              return val + "%"
            }
          }
        },
        {
          title: {
            formatter: function (val) {
              return val + "°C";
            }
          }
        }
      ]
    },
    grid: {
      borderColor: '#f1f1f1',
    }
  };

   return (
    <div className="chart-2">
      <ReactApexChart options={chartOptions} series={chartOptions.series} type="line" height={350} />
    </div>
  );
};

export default WeatherApexChart;
