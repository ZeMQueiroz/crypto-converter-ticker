import React, { useState } from 'react';
import HeaderTabs from '../../components/HeaderTabs';
import Converter from '../../components/Converter';
import History from '../../components/History';
import Result from '../../components/Result';
import Tickers from '../../components/Tickers';
import styles from './style';

const MainPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const renderConverter = () => {
    return (
      <div>
        <Converter />
        <Result />
        <History />
      </div>
    );
  };

  const headerText = selectedTab === 0 ? 'CRYPTO CALCULATOR' : 'TICKERS';

  return (
    <div style={styles.container}>
      <HeaderTabs selectedTab={selectedTab} onTabChange={setSelectedTab} />
      <h1 style={styles.title}>{headerText}</h1>
      {selectedTab === 0 ? renderConverter() : <Tickers />}
    </div>
  );
};

export default MainPage;
