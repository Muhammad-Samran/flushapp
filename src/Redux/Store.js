import authReducer from './AuthSlice';
import { configureStore } from '@reduxjs/toolkit';
const store = configureStore({
  reducer: { auth: authReducer },
  // devTools: false
});
export default store;
