import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faCog, faChartPie, faDatabase, faBrain } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const MenuComponent = ({ menuAberto, toggleMenu, mostrarDashboard, selecionarPagina, menuExpandido }) => {

  const handleToggleMenu = () => {
    if (menuExpandido) {
      toggleMenu(); // Fecha o menu ao clicar na seta se estiver expandido
    } else {
      mostrarDashboard(); // Mostra o conteúdo do Dashboard ao abrir o menu
      toggleMenu(); // Abre o menu ao clicar na seta
    }
  };

  return (
    <nav className={`menu ${menuAberto ? 'aberto' : ''}`}>
      <div className="icones-menu">
        <div className="botao-recolher" onClick={handleToggleMenu}>
          <FontAwesomeIcon icon={faAngleLeft} className={menuAberto ? 'icone-seta girando' : 'icone-seta'} />
        </div>
        <ul className="icones">
          <li className={`icone-chart ${menuExpandido ? 'expandido' : ''}`}>
            <a href="#Dashboard" onClick={() => { selecionarPagina('dashboard'); }}>
              <FontAwesomeIcon icon={faChartPie} />
              {menuAberto && <span className="nome-menu">Dashboard</span>}
            </a>
          </li>
          <li className="icone-database">
            <a href="#Dados" onClick={() => { selecionarPagina('dados'); }}>
              <FontAwesomeIcon icon={faDatabase} />
              {menuAberto && <span className="nome-menu">Dados</span>}
            </a>
          </li>
          <li className="icone-brain">
            <a href="#Rateio" onClick={() => { selecionarPagina('rateio'); }}>
              <FontAwesomeIcon icon={faBrain} />
              {menuAberto && <span className="nome-menu">Rateio</span>}
            </a>
          </li>
        </ul>
      </div>
      <div className={`configuracao ${menuAberto ? 'aberto' : ''}`}>
        <a href="#Configuracao"onClick={() => { selecionarPagina('configuracao'); }}>
          <FontAwesomeIcon icon={faCog} className="icone icone-cog" />
          {menuAberto && <span className="nome-menu">Configuração</span>}
        </a>
      </div>
    </nav>
  );
};

export default MenuComponent;
