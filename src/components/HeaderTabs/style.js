const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid #e0e0d7',
    margin: 10,
  },
  tab: {
    cursor: 'pointer',
    color: '#e1e1de',
    backgroundColor: 'transparent',
    padding: '10px 20px',
    border: 'none',
    borderBottom: '3px solid transparent',
    outline: 'none',
    fontSize: '16px',
  },
  activeTab: {
    cursor: 'pointer',
    color: '#1d5891',
    borderBottom: '3px solid #1d5891',
    backgroundColor: 'transparent',
    padding: '10px 20px',
    outline: 'none',
    fontSize: '16px',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
  },
};

export default styles;
