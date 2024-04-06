import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCoinList } from './redux/currencySlice';
import MainPage from './pages/MainPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoinList());
  }, [dispatch]);

  return (
    <div className="App">
      <MainPage />
    </div>
  );
}

export default App;
