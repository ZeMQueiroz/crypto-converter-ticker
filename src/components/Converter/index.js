import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCurrencies,
  fetchConversionRate,
} from '../../redux/currencySlice';
import ArrowIcon from '../../assets/arrow-to.svg';

import styles from './style';

const Converter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('btc');
  const [toCurrency, setToCurrency] = useState('eth');
  const dispatch = useDispatch();
  const { currencies, status } = useSelector((state) => state.currency);

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  const handleConvert = () => {
    if (amount && fromCurrency && toCurrency) {
      dispatch(
        fetchConversionRate({
          symbol: fromCurrency,
          vsCurrency: toCurrency,
          amount: parseFloat(amount),
        })
      );
    }
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error fetching currencies</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          style={styles.select}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency?.toUpperCase()}
            </option>
          ))}
        </select>
        <span style={styles.arrow}>
          <img src={ArrowIcon} alt="Convert arrow" />
        </span>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          style={styles.select}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency?.toUpperCase()}
            </option>
          ))}
        </select>
        <button style={styles.button} onClick={handleConvert}>
          Convert
        </button>
      </div>
    </div>
  );
};

export default Converter;
