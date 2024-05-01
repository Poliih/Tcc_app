// components/OrderList/index.jsx
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { generateRandomData, generateRandomMonths, generateRandomNames, generateRandomLocations, generateRandomKwh } from '../GeradorDados/GBD';

function OrderList() {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const ids = generateRandomData();
  const dates = generateRandomMonths();
  const names = generateRandomNames();
  const locations = generateRandomLocations();
  const savings = generateRandomData();
  const plants = ["Plant A", "Plant B", "Plant C", "Plant D", "Plant E"];
  const kwh = generateRandomKwh();

  const toggleSort = (columnName) => {
    if (sortColumn === columnName) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnName);
      setSortDirection('asc');
    }
  };

  const renderSortableHeader = (columnName, displayName) => (
    <th onClick={() => toggleSort(columnName)}>
      {displayName}
      {sortColumn === columnName && (
        <FontAwesomeIcon icon={sortDirection === 'asc' ? faSortUp : faSortDown} />
      )}
    </th>
  );

  const sortedIndexes = [...ids.keys()].sort((a, b) => {
    if (sortColumn === 'ids') {
      return (sortDirection === 'asc' ? 1 : -1) * (ids[a] - ids[b]);
    } else if (sortColumn === 'dates') {
      return (sortDirection === 'asc' ? 1 : -1) * (dates[a].localeCompare(dates[b]));
    } else if (sortColumn === 'kwh') {
      return (sortDirection === 'asc' ? 1 : -1) * (parseFloat(kwh[a]) - parseFloat(kwh[b]));
    } else if (sortColumn === 'savings') {
      return (sortDirection === 'asc' ? 1 : -1) * (savings[a] - savings[b]);
    }
    return 0;
  });

  return (
    <div className="order-list">
      <table className="order-table">
        <thead>
          <tr>
            {renderSortableHeader('ids', 'ID')}
            {renderSortableHeader('dates', 'Mês')}
            <th>Nome</th>
            <th>Local</th>
            {renderSortableHeader('savings', 'Economia')}
            {renderSortableHeader('kwh', 'kWh')}
            <th>Usina</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {sortedIndexes.map(index => (
            <tr key={index}>
              <td>{ids[index]}</td>
              <td>{dates[index]}</td>
              <td>{names[index]}</td>
              <td>{locations[index]}</td>
              <td>{savings[index]}</td>
              <td>{kwh[index]}</td>
              <td>{plants[index]}</td>
              <td>
                <FontAwesomeIcon icon={faEllipsisV} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;
