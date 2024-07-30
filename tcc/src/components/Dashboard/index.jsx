import React, { useEffect, useState } from 'react';
import Rectangle from '../Rectangle'; // Ajuste o caminho para o componente Rectangle
import '../Rectangle/styles.css'; // Ajuste o caminho para os estilos do Rectangle
import GraficoBD from '../GraficoBD'; // Ajuste o caminho para o componente GraficoBD
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faBatteryThreeQuarters, faCheckSquare, faAreaChart } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const Dashboard = ({ menuAberto }) => {
  const [dados, setDados] = useState({
    ConsumoTotal: 0,
    GeracaoTotal: 0,
    InjetadoTotal: 0,
    PercentCompensacao: 0,
    comparativoConsumo: 0,
    comparativoGeracao: 0,
    comparativoInjetado: 0,
    comparativoCompensacao: 0
  });

  const formatNumberBR = (number) => {
    return number.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const addRandomPercentage = (value) => {
    const percentage = Math.random() * 0.20; // Gera um número entre 0 e 0.20 (20%)
    return value * (1 + percentage);
  };

  useEffect(() => {
    fetch('http://localhost:5000/data')
      .then(response => response.json())
      .then(data => {
        setDados({
          ConsumoTotal: formatNumberBR(addRandomPercentage(data.ConsumoTotal)),
          GeracaoTotal: formatNumberBR(addRandomPercentage(data.GeracaoTotal)),
          InjetadoTotal: formatNumberBR(addRandomPercentage(data.InjetadoTotal)),
          PercentCompensacao: formatNumberBR(addRandomPercentage(data.PercentCompensacao)),
          comparativoConsumo: -0.9, // Exemplo: Ajuste conforme necessário
          comparativoGeracao: 1.2, // Exemplo: Ajuste conforme necessário
          comparativoInjetado: -0.5, // Exemplo: Ajuste conforme necessário
          comparativoCompensacao: 0.3 // Exemplo: Ajuste conforme necessário
        });
      });
  }, []);

  return (
    <div className="content">
      <div className={`row-content ${menuAberto ? 'menu-aberto' : 'menu-fechado'}`}>
        <Rectangle
          titulo={
            <>
              <FontAwesomeIcon icon={faBolt} className="titulo-icon" /> Geração
            </>
          }
          valor={dados.GeracaoTotal}
          unidade="kWh"
          comparativo={dados.comparativoGeracao}
        />
        <Rectangle
          titulo={
            <>
              <FontAwesomeIcon icon={faBatteryThreeQuarters} className="titulo-icon" /> Consumo 
            </>
          }
          valor={dados.ConsumoTotal}
          unidade="kWh"
          comparativo={dados.comparativoConsumo}
        />
        <Rectangle
          titulo={
            <>
              <FontAwesomeIcon icon={faCheckSquare} className="titulo-icon" /> Injetado 
            </>
          }
          valor={dados.InjetadoTotal}
          unidade="kWh"
          comparativo={dados.comparativoInjetado}
        />
        <Rectangle
          titulo={
            <>
              <FontAwesomeIcon icon={faAreaChart} className="titulo-icon" /> Compensação              
            </>
          }
          valor={dados.PercentCompensacao}
          unidade="%"
          comparativo={dados.comparativoCompensacao}
        />
      </div>
      <div className="chart-container">
        <GraficoBD />
      </div>
    </div>
  );
};

export default Dashboard;
