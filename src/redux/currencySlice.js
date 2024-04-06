import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCurrencies = createAsyncThunk(
  'currency/fetchCurrencies',
  async () => {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/supported_vs_currencies',
      {
        headers: { 'x-cg-demo-api-key': 'CG-71fsu8xfqr3CmFodrPNDL154' },
      }
    );
    const currencies = await response.json();
    return currencies;
  }
);

export const fetchConversionRate = createAsyncThunk(
  'currency/fetchConversionRate',
  async ({ symbol, vsCurrency, amount }, { getState }) => {
    const state = getState();
    let coinId;
    if (symbol.toLowerCase() === 'btc') {
      coinId = 'bitcoin';
    } else {
      coinId = state.currency.coinMap[symbol.toLowerCase()];
    }

    if (!coinId) {
      throw new Error(`Coin ID not found for symbol: ${symbol}`);
    }

    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=${vsCurrency}`,
      {
        headers: { 'x-cg-demo-api-key': 'CG-71fsu8xfqr3CmFodrPNDL154' },
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();
    const rate = data[coinId][vsCurrency];
    return {
      amount,
      symbol,
      vsCurrency,
      result: rate,
      id: coinId,
    };
  }
);

export const fetchCoinList = createAsyncThunk(
  'currency/fetchCoinList',
  async () => {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/list',
      {
        headers: { 'x-cg-demo-api-key': 'CG-71fsu8xfqr3CmFodrPNDL154' },
      }
    );
    const coins = await response.json();

    const coinMap = coins.reduce((acc, coin) => {
      // had to reduce the array to an object to keep it serializable
      acc[coin.symbol.toLowerCase()] = coin.id;
      return acc;
    }, {});
    return coinMap;
  }
);

export const fetchExchanges = createAsyncThunk(
  'currency/fetchExchanges',
  async () => {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/exchanges/list',
      {
        headers: { 'x-cg-demo-api-key': 'CG-71fsu8xfqr3CmFodrPNDL154' },
      }
    );
    const exchanges = await response.json();
    return exchanges;
  }
);

export const fetchTickers = createAsyncThunk(
  'currency/fetchTickers',
  async ({ symbol, exchangeId }, { getState }) => {
    const state = getState();
    const coinId =
      symbol.toLowerCase() === 'btc'
        ? 'bitcoin'
        : state.currency.coinMap[symbol.toLowerCase()];

    if (!coinId) {
      throw new Error(`Coin ID not found for symbol: ${symbol}`);
    }

    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/tickers?exchange_ids=${exchangeId}`,
      {
        headers: { 'x-cg-demo-api-key': 'CG-71fsu8xfqr3CmFodrPNDL154' },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching tickers for coin: ${coinId}`);
    }

    const { tickers } = await response.json();

    return tickers;
  }
);

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    currencies: [],
    history: [],
    coinMap: {},
    status: 'idle',
    error: null,
    exchanges: [],
    tickers: [],
  },
  reducers: {
    addConversion: (state, action) => {
      state.history.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinList.fulfilled, (state, action) => {
        state.coinMap = action.payload;
      })
      .addCase(fetchCurrencies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currencies = action.payload;
      })
      .addCase(fetchCurrencies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchExchanges.fulfilled, (state, action) => {
        state.exchanges = action.payload;
      })
      .addCase(fetchTickers.fulfilled, (state, action) => {
        state.tickers = action.payload;
      })
      .addCase(fetchConversionRate.fulfilled, (state, action) => {
        state.history.push({
          symbol: action.payload.symbol,
          vsCurrency: action.payload.vsCurrency,
          result: action.payload.result,
          id: action.payload.id,
          amount: action.payload.amount,
        });
      });
  },
});

export const { addConversion } = currencySlice.actions;
export default currencySlice.reducer;
