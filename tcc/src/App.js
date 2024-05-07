import React, { useState } from 'react';
import './App.css';
import './components/Button/Button1.css';
import './components/Rectangle2/Rectangle2.css';
import './components/menu/MenuComponent.css';
import MenuComponent from './components/menu/menu';

import Rectangle2 from './components/Rectangle2/Rectangle2';
import { Row } from './styles';
import Graphic from './components/Graphic';
import './components/Graphic/index.css';
import OrderList from "./components/OrderList";
import "./components/OrderList/index.css"; // Importa os estilos do componente
// Remova esta importação redundante
// import '../GeradorDados/GBD';

function App() {
  const [menuAberto, setMenuAberto] = useState(true);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <div className={`container ${menuAberto ? 'menu-aberto' : 'menu-fechado'}`}>
      <MenuComponent menuAberto={menuAberto} toggleMenu={toggleMenu} />
      <div className="content">
        <Row>
          <Rectangle2 className="rectangle-spacing" />
          <Rectangle2 className="rectangle-spacing" />
          <Rectangle2 className="rectangle-spacing" />
        </Row>
        <Graphic />
        {/* Certifique-se de que não há uso de useContext dentro do componente OrderList */}
        <OrderList />
      </div>
    </div>
  );
}

export default App;
