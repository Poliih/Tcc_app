import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faCog, faChartPie, faDatabase, faBrain } from '@fortawesome/free-solid-svg-icons';

const MenuComponent = ({ menuAberto, toggleMenu }) => {
  const handleToggleMenu = () => {
    toggleMenu();
  };

  return (
    <div className={`menu ${menuAberto ? '' : 'fechado'}`}>
      <div className="icones-menu">
        <div className={`botao-recolher ${menuAberto ? '' : 'rotate'}`} onClick={handleToggleMenu}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
        <ul className={`icones ${menuAberto ? '' : 'fechado'}`}>
          <li>
            <a href="#Dashboard">
              <span className="icone icone-chart"><FontAwesomeIcon icon={faChartPie} /></span>
              {menuAberto && <span>Dashboard</span>}
            </a>
          </li>
          <li>
            <a href="#Dados">
              <span className="icone icone-database"><FontAwesomeIcon icon={faDatabase} /></span>
              {menuAberto && <span>Dados</span>}
            </a>
          </li>
          <li>
            <a href="#Rateio">
              <span className="icone icone-brain"><FontAwesomeIcon icon={faBrain} /></span>
              {menuAberto && <span>Rateio</span>}
            </a>
          </li>
          <li>
            <a href="#Configuração">
              <span className="icone icone-cog"><FontAwesomeIcon icon={faCog} /></span>
              {menuAberto && <span>Configuração</span>}
            </a>
          </li>
        </ul>
      </div>
      <ul className={`palavras ${menuAberto ? '' : 'oculto'}`} onClick={handleToggleMenu}>
        
      </ul>
    </div>
  );
};

export default MenuComponent;
