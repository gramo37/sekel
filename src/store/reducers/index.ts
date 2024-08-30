import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cart.reducer';

const rootReducer = combineReducers({
    cartReducer,
});

export default rootReducer;
