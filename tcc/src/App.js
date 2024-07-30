import React, { useState } from 'react';
import MenuComponent from './components/Menu';
import Dashboard from './components/Dashboard';
import Dados from './components/Dados';
import './App.css';

function App() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [paginaSelecionada, setPaginaSelecionada] = useState('dashboard'); // Define uma página inicial
  const [menuExpandido, setMenuExpandido] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
    setMenuExpandido(!menuExpandido); // Alternar entre expandido/recolhido
  };

  const handleSelecionarPagina = (pagina) => {
    setPaginaSelecionada(pagina);
  };

  return (
    <div className={`container ${menuAberto ? 'menu-aberto' : 'menu-fechado'}`}>
      <MenuComponent
        menuAberto={menuAberto}
        toggleMenu={toggleMenu}
        selecionarPagina={handleSelecionarPagina}
        menuExpandido={menuExpandido}
      />
      <div className={`content ${menuExpandido ? 'menu-expandido' : ''}`}>
        {paginaSelecionada === 'dashboard' && <Dashboard menuAberto={menuAberto} />}
        {paginaSelecionada === 'dados' && <Dados menuAberto={menuAberto} />}
        {paginaSelecionada === 'rateio' && <div className="pagina-em-branco">Página de Rateio</div>}
        {paginaSelecionada === 'configuracao' && <div className="pagina-em-branco">Página de Configuração</div>}
      </div>
    </div>
  );
}

export default App;
