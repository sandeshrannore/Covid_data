// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Features/counter/counterSlice';
import userReducer from './Features/userActions/userSlice';
import {countryApi, graphApi} from './Features/covidSlice/CovidSlice'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    [countryApi.reducerPath]: countryApi.reducer,
    [graphApi.reducerPath]: graphApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(countryApi.middleware, graphApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
