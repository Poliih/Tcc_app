import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faCog, faChartPie, faDatabase, faBrain } from '@fortawesome/free-solid-svg-icons';

const MenuComponent = ({ menuAberto, toggleMenu }) => {
  const handleCloseMenu = () => {
    if (menuAberto) {
      toggleMenu();
    }
  };

  const expandMenu = () => {
    toggleMenu();
  };

  const collapseMenu = () => {
    toggleMenu();
  };

  return (
    <div className={`menu ${menuAberto ? '' : 'fechado'}`}>
      {menuAberto && (
        <div className="botao-recolher" onClick={collapseMenu}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
      )}
      {!menuAberto && (
        <div className="botao-expandir" onClick={expandMenu}>
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      )}
      <ul className={menuAberto ? '' : 'oculto'} onClick={handleCloseMenu}>
        <li>
          <a href="#Dashboard">
            <span className="icone icone-chart"><FontAwesomeIcon icon={faChartPie} /></span>
            Dashboard
          </a>
        </li>
        <li>
          <a href="#Dados">
            <span className="icone icone-database"><FontAwesomeIcon icon={faDatabase} /></span>
            Dados
          </a>
        </li>
        <li>
          <a href="#Rateio">
            <span className="icone icone-brain"><FontAwesomeIcon icon={faBrain} /></span>
            Rateio
          </a>
        </li>
        <li>
          <a href="#Configuração">
            <span className="icone icone-cog"><FontAwesomeIcon icon={faCog} /></span>
            Configuração
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MenuComponent;
