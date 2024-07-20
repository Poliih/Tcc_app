import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';



const GraficoBD = () => {
  const [meses, setMeses] = useState([]);
  const [consumoDoMes, setConsumoDoMes] = useState([]);
  const [energiaCompensadaCCMes1, setEnergiaCompensadaCCMes1] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/data')
      .then(response => response.json())
      .then(data => {
        // Convertendo os valores para números
        setMeses(data.Meses);
        setConsumoDoMes(data.TotalConsumo.map(Number));
        setEnergiaCompensadaCCMes1(data.TotalEnergiaCompensada.map(Number));
      });
  }, []);

  const options = {
    series: [{
      name: 'Consumo do Mês',
      data: consumoDoMes
    }, {
      name: 'Energia Compensada CC Mês 1',
      data: energiaCompensadaCCMes1
    }],
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
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
      categories: meses, // Atualizado para mostrar os meses dinamicamente
    },
    yaxis: {
      title: {
        text: 'Quantidade'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        }
      }
    }
  };

  return (
    <div className="GraficoBD">
      <h1>Consumo X Energia Compensada</h1>
      <div className="chart-container">
        <Chart options={options} series={options.series} type="bar" height={350} />
      </div>
    </div>
  );
}

export default GraficoBD;
