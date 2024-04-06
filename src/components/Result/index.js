import React from 'react';
import { useSelector } from 'react-redux';

import styles from './style';

const Result = () => {
  const history = useSelector((state) => state.currency.history);

  if (history.length === 0) return null;

  const lastEntry = history[history.length - 1];

  return lastEntry ? (
    <div style={styles.container}>
      <p style={styles.title}>RESULT</p>
      <div style={styles.textContainer}>
        <p style={styles.resultText}>
          {lastEntry.amount} {lastEntry.symbol?.toUpperCase()}
        </p>
        <p style={styles.dividerText}>is worth</p>
        <p style={styles.resultText}>
          {lastEntry.result} {lastEntry.vsCurrency?.toUpperCase()}
        </p>
      </div>
    </div>
  ) : null;
};

export default Result;
