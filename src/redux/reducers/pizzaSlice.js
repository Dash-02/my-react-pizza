import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	pizzas: [{
        index: null,
        counter: 0,
        title: '',
        image: '',
        size: [],
        type: [],
        price: [],
    }]
}

const pizzaSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setPizzas(state, action) {
            state.pizzas = action.payload
        },
        setPrices(state, action){
            state.pizzas = action.payload
            // console.log(state.pizzas[0].price)
            const val = state.pizzas.map((el) => {
				if (el.price.length > 0 && action.payload === el.index) {
					return {...el.price, 
                        price: el.price}
                        // price: [...state.pizzas.el, el]}
				} else {
					return el;
				}
			})
			state.pizzas.price  = val
        },
    }
})

export const {setPizzas, setPrices} = pizzaSlice.actions
export default pizzaSlice.reducer


// щас приду