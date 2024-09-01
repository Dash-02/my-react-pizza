import { configureStore } from '@reduxjs/toolkit'
import fetchDataSlice from './reducers/fetchDataSlice'
import counterSlice from './reducers/counterSlice'
import pizzaSlice from './reducers/pizzaSlice';
import pizzaCartSlice from './reducers/pizzaCart';
import filterSlice from './reducers/filterSlice';


export const store = configureStore({
	reducer: {
        fetchDataSlice,
        counterSlice,
        pizzaSlice,
        pizzaCartSlice,
        filterSlice,
    }
})

export default store;