// components/Dashboard.js

import React from 'react';
import Rectangle from './Rectangle'; // Importando o componente Rectangle
import './Rectangle/styles.css'; // Importando os estilos do Rectangle
import ApexChartComponent from './graphic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faBatteryThreeQuarters, faCheckSquare, faAreaChart } from '@fortawesome/free-solid-svg-icons';

const Dashboard = ({ menuAberto }) => {
  // Valores fictícios para consumo, geração, injetado e porcentagem de compensação
  const consumoTotal = 3188000; // Exemplo de consumo total (em kWh)
  const geracaoTotal = 3500000; // Exemplo de geração total (em kWh)
  const injetadoTotal = 2862000; // Exemplo de injetado total (em kWh)
  const percentCompensacao = (injetadoTotal / consumoTotal) * 100; // Calculando a porcentagem de compensação

  // Comparativos fictícios
  const comparativoConsumo = -0.9; // Exemplo: Consumo diminuiu 0.9%
  const comparativoGeracao = 1.2; // Exemplo: Geração aumentou 1.2%
  const comparativoInjetado = -0.5; // Exemplo: Injetado diminuiu 0.5%
  const comparativoCompensacao = 0.3; // Exemplo: Compensação aumentou 0.3%

  return (
    <div className="content">
      <div className={`row-content ${menuAberto ? 'menu-aberto' : 'menu-fechado'}`}>
        <Rectangle
          titulo={
            <>
              <FontAwesomeIcon icon={faBolt} className="titulo-icon" /> Geração
            </>
          }
          valor={geracaoTotal}
          unidade="kWh"
          comparativo={comparativoGeracao}
        />
        <Rectangle
          titulo={
            <>
              <FontAwesomeIcon icon={faBatteryThreeQuarters} className="titulo-icon" /> Consumo 
            </>
          }
          valor={consumoTotal}
          unidade="kWh"
          comparativo={comparativoConsumo}
        />
        <Rectangle
          titulo={
            <>
              <FontAwesomeIcon icon={faCheckSquare} className="titulo-icon" /> Injetado 
            </>
          }
          valor={injetadoTotal}
          unidade="kWh"
          comparativo={comparativoInjetado}
        />
        <Rectangle
          titulo={
            <>
              <FontAwesomeIcon icon={faAreaChart} className="titulo-icon" /> Compensação              
            </>
          }
          valor={percentCompensacao}
          unidade="%"
          comparativo={comparativoCompensacao}
        />
      </div>
      <div className="chart-container">
        <ApexChartComponent />
      </div>
    </div>
  );
};

export default Dashboard;
