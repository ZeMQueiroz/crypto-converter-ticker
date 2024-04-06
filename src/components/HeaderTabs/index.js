import React from 'react';
import styles from './style';

const HeaderTabs = ({ selectedTab, onTabChange }) => {
  const getTabStyle = (tab) => {
    return selectedTab === tab ? styles.activeTab : styles.tab;
  };

  const tabs = ['CRYPTO CALCULATOR', 'TICKERS'];

  return (
    <div style={styles.container}>
      {tabs.map((name, idx) => (
        <button
          key={name}
          onClick={() => onTabChange(idx)}
          style={getTabStyle(idx)}
        >
          {name}
        </button>
      ))}
    </div>
  );
};

export default HeaderTabs;
