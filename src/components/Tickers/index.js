import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/pt';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExchanges, fetchTickers } from '../../redux/currencySlice';
import styles from './style';

const Tickers = () => {
  const dispatch = useDispatch();
  const { exchanges, tickers, currencies } = useSelector(
    (state) => state.currency
  );

  moment.locale('pt');

  const [selectedCoin, setSelectedCoin] = useState('btc');
  const [selectedExchange, setSelectedExchange] = useState('binance');

  useEffect(() => {
    if (!exchanges || exchanges.length === 0) {
      dispatch(fetchExchanges());
    }
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      fetchTickers({ symbol: selectedCoin, exchangeId: selectedExchange })
    );
  };

  const renderLoading = () => {
    return <p>Loading...</p>;
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <select
          value={selectedCoin}
          onChange={(e) => setSelectedCoin(e.target.value)}
          style={styles.selectCoinInput}
        >
          {currencies?.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.toUpperCase()}
            </option>
          ))}
        </select>

        <select
          value={selectedExchange}
          onChange={(e) => setSelectedExchange(e.target.value)}
          style={styles.selectExchInput}
        >
          {exchanges?.map((exchange) => (
            <option key={exchange.id} value={exchange.id}>
              {exchange.name}
            </option>
          ))}
        </select>
        <button type="submit" style={styles.searchButton}>
          Search
        </button>
      </form>

      {tickers
        ? tickers.map((ticker) => (
            <div key={ticker.id} style={styles.tickerContainer}>
              <div style={styles.tickerLeft}>
                <p style={styles.leftTitle}>
                  {ticker.base}/{ticker.target}
                </p>
                <div style={styles.tickerContent}>
                  <p style={styles.tickerValueBold}>Last value:</p>
                  <p style={styles.tickerValue}>{ticker.last}</p>
                  <p style={styles.tickerValueBold}>{ticker.target}</p>
                </div>
                <div style={styles.tickerContent}>
                  <p style={styles.tickerValueBold}>Last trade:</p>
                  <p style={styles.tickerValue}>
                    {moment(ticker.last_traded_at).format('DD MMM YYYY, HH:mm')}
                  </p>
                </div>
              </div>
              <div style={styles.tickerRight}>
                <p style={styles.viewMoreLink}>View more</p>
                <div style={styles.tickerContentRight}>
                  <div style={styles.tickerContent}>
                    <p style={styles.tickerValueBold}>Market: </p>
                    <p style={styles.tickerValue}>{ticker.market.name}</p>
                  </div>
                  <div style={styles.tickerContent}>
                    <p style={styles.tickerValueBold}> Market volume:</p>
                    <p style={styles.tickerValue}>{ticker.volume}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        : renderLoading()}
    </div>
  );
};

export default Tickers;
