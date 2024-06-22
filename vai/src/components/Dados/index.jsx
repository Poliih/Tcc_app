import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';
import Rectangle from '../Rectangle'; // Ajuste o caminho para o componente Rectangle
import '../Rectangle/styles.css'; // Ajuste o caminho para os estilos do Rectangle
import WeatherApexChart from './WeatherApexChart'; // Verifique se o caminho está correto para o seu componente WeatherApexChart
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importe FontAwesomeIcon aqui
import { faTemperatureHigh, faCloudShowersHeavy, faWind, faWater } from '@fortawesome/free-solid-svg-icons'; // Importe os ícones necessários

const Dados = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);

  // Função para buscar dados da API
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/weather');
      setWeatherData(response.data);

      // Simulação de dados horários com base na resposta da API
      const simulatedHourlyData = [
        { hour: '00', precipitation: 0, humidity: 54, temperature: 22.6 },
        { hour: '01', precipitation: 0, humidity: 57, temperature: 21.6 },
        { hour: '02', precipitation: 0, humidity: 59, temperature: 20.8 },
        { hour: '03', precipitation: 0, humidity: 61, temperature: 20.3 },
        { hour: '04', precipitation: 0, humidity: 63, temperature: 19.7 },
        { hour: '05', precipitation: 0, humidity: 60, temperature: 20 },
        { hour: '06', precipitation: 0, humidity: 69, temperature: 18.4 },
        { hour: '07', precipitation: 0, humidity: 65, temperature: 19.2 },
        { hour: '08', precipitation: 0, humidity: 67, temperature: 19 },
        { hour: '09', precipitation: 0, humidity: 68, temperature: 18.7 },
        { hour: '10', precipitation: 0, humidity: 68, temperature: 18.8 },
        { hour: '11', precipitation: 0, humidity: 62, temperature: 20.2 },
        { hour: '12', precipitation: 0, humidity: 56, temperature: 22 },
        { hour: '13', precipitation: 0, humidity: 47, temperature: 24.7 },
        { hour: '14', precipitation: 0, humidity: 42, temperature: 26 },
        { hour: '15', precipitation: 0, humidity: 37, temperature: 28 },
        { hour: '16', precipitation: 0, humidity: 31, temperature: 28.6 },
        { hour: '17', precipitation: 0, humidity: 27, temperature: 30.2 },
        { hour: '18', precipitation: null, humidity: null, temperature: null },
        { hour: '19', precipitation: null, humidity: null, temperature: null },
        { hour: '20', precipitation: null, humidity: null, temperature: null },
        { hour: '21', precipitation: null, humidity: null, temperature: null },
        { hour: '22', precipitation: null, humidity: null, temperature: null },
        { hour: '23', precipitation: null, humidity: null, temperature: null },
      ];

      setHourlyData(simulatedHourlyData);
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
          valor={weatherData.TEMP_MED}
          unidade="°C"
          // Ajuste aqui se houver um comparativo específico para temperatura
        />
        <Rectangle
          titulo={
            <>
              <FontAwesomeIcon icon={faCloudShowersHeavy} className="titulo-icon" /> Chuva
            </>
          }
          valor={weatherData.CHUVA}
          unidade="mm"
          // Ajuste aqui se houver um comparativo específico para chuva
        />
        <Rectangle
          titulo={
            <>
              <FontAwesomeIcon icon={faWind} className="titulo-icon" /> Vento
            </>
          }
          valor={weatherData.VEL_VENTO_MED}
          unidade="m/s"
           // Ajuste aqui se houver um comparativo específico para velocidade do vento
        />
        <Rectangle
          titulo={
            <>
              <FontAwesomeIcon icon={faWater} className="titulo-icon" /> Umidade
            </>
          }
          valor={weatherData.UMID_MED}
          unidade="%"
          // Ajuste aqui se houver um comparativo específico para umidade
        />
      </div>
      <WeatherApexChart data={hourlyData} />
      <div className="dados-container">
        <div className="dados">
          <p>Umidade Média: {weatherData.UMID_MED}%</p>
          <p>Data de Medição: {weatherData.DT_MEDICAO}</p>
          <p>Cidade: {weatherData.DC_NOME}</p>
          <p>Umidade Mínima: {weatherData.UMID_MIN}%</p>
          <p>Temperatura Média: {weatherData.TEMP_MED}°C</p>
          <p>Chuva: {weatherData.CHUVA} mm</p>
          <p>Latitude: {weatherData.VL_LATITUDE}</p>
          <p>Temperatura Mínima: {weatherData.TEMP_MIN}°C</p>
          <p>Temperatura Máxima: {weatherData.TEMP_MAX}°C</p>
          <p>Estado: {weatherData.UF}</p>
          <p>Velocidade do Vento Média: {weatherData.VEL_VENTO_MED} m/s</p>
          <p>Código da Estação: {weatherData.CD_ESTACAO}</p>
          <p>Longitude: {weatherData.VL_LONGITUDE}</p>
        </div>
        
      </div>
    </div>
  );
};

export default Dados;
