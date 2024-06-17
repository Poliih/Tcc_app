import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faCog, faChartPie, faDatabase, faBrain } from '@fortawesome/free-solid-svg-icons';

const MenuComponent = () => {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <nav className={`menu ${menuAberto ? 'aberto' : ''}`}>
      <div className="icones-menu">
        <div className="botao-recolher" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faAngleLeft} className={menuAberto ? 'icone-seta girando' : 'icone-seta'} />
        </div>
        <ul className="icones">
          <li className="icone-chart">
            <a href="#Dashboard">
              <FontAwesomeIcon icon={faChartPie} />
              {menuAberto && <span className="nome-menu">Dashboard</span>}
            </a>
          </li>
          <li className="icone-database">
            <a href="#Dados">
              <FontAwesomeIcon icon={faDatabase} />
              {menuAberto && <span className="nome-menu">Dados</span>}
            </a>
          </li>
          <li className="icone-brain">
            <a href="#Rateio">
              <FontAwesomeIcon icon={faBrain} />
              {menuAberto && <span className="nome-menu">Rateio</span>}
            </a>
          </li>
        </ul>
      </div>
      <div className="configuracao">
        <a href="#Configuracao">
          <FontAwesomeIcon icon={faCog} className="icone icone-cog" />
        </a>
      </div>
    </nav>
  );
};

export default MenuComponent;
