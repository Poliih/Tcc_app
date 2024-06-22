// App.js

import React, { useState } from 'react';
import MenuComponent from './components/Menu';
import './components/Menu/styles.css';
import Rectangle from './components/Rectangle'; // Importando o componente Rectangle
import './components/Rectangle/styles.css'; // Importando os estilos do Rectangle
import './components/grafico/styles.css';
import './App.css';
import ApexChartComponent from './components/graphic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faBatteryThreeQuarters, faCheckSquare, faAreaChart } from '@fortawesome/free-solid-svg-icons';
function App() {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

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
    <div className={`container ${menuAberto ? 'menu-aberto' : 'menu-fechado'}`}>
      <MenuComponent menuAberto={menuAberto} toggleMenu={toggleMenu} />
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
<FontAwesomeIcon icon={faAreaChart} className="titulo-icon" /> Compensação              </>
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
    </div>
  );
}



export default App;
