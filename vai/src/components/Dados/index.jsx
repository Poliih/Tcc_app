import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';
import Rectangle from '../Rectangle'; // Ajuste o caminho para o componente Rectangle
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importe FontAwesomeIcon aqui
import { faTemperatureHigh, faCloudShowersHeavy, faWind, faWater } from '@fortawesome/free-solid-svg-icons'; // Importe os ícones necessários
import ApexCharts from 'react-apexcharts'; // Importe o ApexCharts

const Dados = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);

  // Função para buscar dados da API
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/weather');
      setWeatherData(response.data);

      // Extrair dados horários para o gráfico
      const hourlyData = response.data.map(item => ({
        hour: item.HR_MEDICAO,
        temperature: item.TEM_INS, // Temperatura
        humidity: item.UMD_INS, // Umidade
        wind: item.VEN_VEL, // Vento
        rain: item.PRE_INS // Chuva
      }));

      setHourlyData(hourlyData);
    } catch (error) {
      console.error('Erro ao buscar dados meteorológicos:', error);
    }
  };

  // Efeito de lado para buscar os dados da API na montagem do componente
  useEffect(() => {
    fetchWeatherData(); // Busca os dados ao montar o componente

    // Intervalo para buscar dados a cada 5 minutos (300000 milissegundos)
    const interval = setInterval(() => {
      fetchWeatherData(); // Busca os dados periodicamente
    }, 300000); // 300000 milissegundos = 5 minutos

    // Limpa o intervalo ao desmontar o componente para evitar vazamentos de memória
    return () => clearInterval(interval);
  }, []);

  // Renderização condicional enquanto os dados estão sendo buscados
  if (!weatherData) {
    return (
      <div className="dados-container">
        <h2>Dados Meteorológicos</h2>
        <p>Carregando...</p>
      </div>
    );
  }

  // Configurações do gráfico ApexCharts
  const chartOptions = {
    chart: {
      id: 'weather-chart',
      type: 'line',
      height: 350,
    },
    xaxis: {
      categories: hourlyData.map(data => data.hour),
    },
  };

  // Renderização quando os dados estão disponíveis
  return (
    <div className="content">
      <div className="row-content">
        <Rectangle
          titulo={
            <>
              <FontAwesomeIcon icon={faTemperatureHigh} className="titulo-icon" /> Temperatura
            </>
          }
          valor={weatherData[0].TEM_INS} // Utiliza o primeiro registro para valores individuais
          unidade="°C"
          // Ajuste aqui se houver um comparativo específico para temperatura
        />
        <Rectangle
          titulo={
            <>
              <FontAwesomeIcon icon={faWind} className="titulo-icon" /> Vento
            </>
          }
          valor={weatherData[0].VEN_VEL} // Utiliza o primeiro registro para valores individuais
          unidade="m/s"
          // Ajuste aqui se houver um comparativo específico para velocidade do vento
        />
        <Rectangle
          titulo={
            <>
              <FontAwesomeIcon icon={faWater} className="titulo-icon" /> Umidade
            </>
          }
          valor={weatherData[0].UMD_INS} // Utiliza o primeiro registro para valores individuais
          unidade="%"
          // Ajuste aqui se houver um comparativo específico para umidade
        />
        <Rectangle
          titulo={
            <>
              <FontAwesomeIcon icon={faCloudShowersHeavy} className="titulo-icon" /> Chuva
            </>
          }
          valor={weatherData[0].PRE_INS} // Utiliza o primeiro registro para valores individuais
          unidade="mm"
          // Ajuste aqui se houver um comparativo específico para chuva
        />
      </div>
      <div className="chart-container">
        <ApexCharts options={chartOptions} series={[
          { name: 'Temperatura', data: hourlyData.map(data => data.temperature) },
          { name: 'Umidade', data: hourlyData.map(data => data.humidity) },
          { name: 'Vento', data: hourlyData.map(data => data.wind) }
        ]} type="line" height={350} />
      </div>
    </div>
  );
};

export default Dados;
