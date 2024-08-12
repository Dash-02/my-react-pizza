import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	pizzas: [{
        index: null,
        size: [],
        type: [],
        price: [],
    }]
}

const pizzaSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setSize(state, action) {
            state.pizzas.size = action.payload
        },
        setType(state, action) {
            state.pizzas.type = action.payload
        },
        setPrice(state, action) {
            state.pizzas.price = action.payload
        },
        setPizzas(state, action) {
            state.pizzas = action.payload
        },
    }
})

export const {setSize, setType, setPrice, setPizzas} = pizzaSlice.actions
export default pizzaSlice.reducer