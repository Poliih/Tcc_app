import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';  // Importe o arquivo de estilos específico para este componente

const Dados = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const response = await axios.get('http://localhost:5000/api/weather'); 
        console.log(response.data);  // Adicione um log para verificar a resposta da API
        setWeatherData(response.data);  // Define os dados recebidos no estado weatherData
      } catch (error) {
        console.error('Erro ao buscar dados meteorológicos:', error);
      }
    }

    fetchWeatherData();  // Chama a função de busca ao montar o componente
  }, []);

  if (!weatherData) {
    return (
      <div className="dados-container">
        <h2>Dados Meteorológicos</h2>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="dados-container">
      <h2>Dados Meteorológicos</h2>
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
  );
};

export default Dados;
