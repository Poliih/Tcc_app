import React, { useState } from 'react';
import MenuComponent from './components/Menu';
import './components/Menu/styles.css';
import Rectangle from './components/Rectangle';
import './components/Rectangle/styles.css';
import { Row } from './styles';
import LineChart from './components/grafico';
import './components/grafico/styles.css';
import './App.css';
import ApexChartComponent from './components/graphic';

function App() {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <div className={`container ${menuAberto ? 'menu-aberto' : 'menu-fechado'}`}>
      <MenuComponent menuAberto={menuAberto} toggleMenu={toggleMenu} />
      <div className="content">
        <Row className={`row-content ${menuAberto ? 'menu-aberto' : 'menu-fechado'}`}>
          <Rectangle />
          <Rectangle />
          <Rectangle />
          <Rectangle />   
        </Row>
          <div>
           <ApexChartComponent />
          </div>
      </div>
    </div>
  );
}

export default App;
