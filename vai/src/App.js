import React, { useState } from 'react';
import MenuComponent from './components/Menu';
import Dashboard from './components/Dashboard';
import Dados from './components/Dados';
import './App.css';

function App() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [paginaSelecionada, setPaginaSelecionada] = useState(null);
  const [menuExpandido, setMenuExpandido] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
    setMenuExpandido(!menuExpandido); // Alternar entre expandido/recolhido
  };

  const handleMostrarDashboard = () => {
    if (!menuExpandido) {
      toggleMenu(); // Fecha o menu ao mostrar o dashboard se não estiver expandido
    }
    setPaginaSelecionada('dashboard');
  };

  const handleSelecionarPagina = (pagina) => {
    setPaginaSelecionada(pagina);
    setMenuExpandido(false); // Recolhe o menu ao selecionar outra página
  };

  return (
    <div className={`container ${menuAberto ? 'menu-aberto' : 'menu-fechado'}`}>
      <MenuComponent
        menuAberto={menuAberto}
        toggleMenu={toggleMenu}
        mostrarDashboard={handleMostrarDashboard}
        selecionarPagina={handleSelecionarPagina}
        menuExpandido={menuExpandido}
      />
      <div className={`content ${menuExpandido ? 'menu-expandido' : ''}`}>
        {paginaSelecionada === 'dashboard' && <Dashboard />}
        {paginaSelecionada === 'dados' && <Dados />}
        {paginaSelecionada === 'rateio' && <div className="pagina-em-branco">Página de Rateio</div>}
        {paginaSelecionada === 'configuracao' && <div className="pagina-em-branco">Página de Configuração</div>}
      </div>
    </div>
  );
}

export default App;
