import React, { useState } from 'react';
import MenuComponent from './components/Menu';
import './components/Menu/styles.css'; // Estilo do MenuComponent
import Rectangle from './components/Rectangle';
import './components/Rectangle/styles.css'; // Corrigindo o import do estilo do componente Rectangle
import { Row } from './styles';


function App() {
  const [menuAberto, setMenuAberto] = useState(true);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <div className={`container ${menuAberto ? 'menu-aberto' : 'menu-fechado'}`}>
      <MenuComponent menuAberto={menuAberto} toggleMenu={toggleMenu} />
      <div className="content">
        <Row> {/* Movendo o elemento Row para dentro da div container */}
          <Rectangle className="rectangle-spacing" />
          <Rectangle className="rectangle-spacing" />
          <Rectangle className="rectangle-spacing" />
      </Row>
  
      </div>
    </div>
  );
}

export default App;
