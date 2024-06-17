import React, { useState } from 'react';
import MenuComponent from './components/Menu';
import './components/Menu/styles.css'; // Estilo do MenuComponent


function App() {
  const [menuAberto, setMenuAberto] = useState(true);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <div className={`container ${menuAberto ? 'menu-aberto' : 'menu-fechado'}`}>
      <MenuComponent menuAberto={menuAberto} toggleMenu={toggleMenu} />
      <div className="content">
  
      </div>
    </div>
  );
}

export default App;
