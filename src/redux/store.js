import { configureStore } from '@reduxjs/toolkit'
import fetchDataSlice from './reducers/fetchDataSlice'
import counterSlice from './reducers/counterSlice'
import pizzaSlice from './reducers/pizzaSlice';


export const store = configureStore({
	reducer: {
        fetchDataSlice,
        counterSlice,
        pizzaSlice
    }
})

export default store;