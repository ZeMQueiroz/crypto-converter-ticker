import React from 'react';
import { useSelector } from 'react-redux';

import styles from './style';

const History = () => {
  const { history } = useSelector((state) => state.currency);

  return (
    <div style={styles.container}>
      {history.map((entry, index) => (
        <div key={index} style={styles.itemContainer}>
          <p style={styles.listItem}>
            {entry?.amount} {entry?.symbol?.toUpperCase()}
          </p>
          <p style={styles.listItem}>is worth</p>
          <p style={styles.listItem}>
            {entry.result * entry.amount} {entry?.vsCurrency.toUpperCase()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default History;
