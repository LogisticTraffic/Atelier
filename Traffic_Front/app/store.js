import { configureStore } from '@reduxjs/toolkit';  // Redux Toolkit import
import authReducer from './reducers/authReducer';  // Import your reducer

const store = configureStore({
  reducer: authReducer,  // Your reducer is passed here
});

export default store;
