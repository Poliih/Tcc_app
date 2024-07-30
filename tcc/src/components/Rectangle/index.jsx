import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

const Rectangle = ({ titulo, valor, unidade, comparativo }) => {
  const comparativoIcon = comparativo > 0 ? faCaretUp : faCaretDown;
  const comparativoColor = comparativo > 0 ? '#34C759' : '#FF453A';

  return (
    <div className="Rectangle">
      <div className="info">
        <div className="titulo">
          {titulo}
        </div>
        <div className="valor">
          {valor !== undefined && valor !== null ? valor.toLocaleString() : '-'} {unidade}
        </div>
        {comparativo !== undefined && (
          <div className="comparativo" style={{ color: comparativoColor }}>
            <FontAwesomeIcon icon={comparativoIcon} className="comparativo-icon" /> {Math.abs(comparativo)}%
          </div>
        )}
      </div>
    </div>
  );
};

export default Rectangle;
