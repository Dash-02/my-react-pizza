import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    pizzasCart: [{
        index: null,
        counter: 0,
        title: '',
        image: '',
        size: null,
        type: null,
        price: null,
    }]
}

const pizzaCartSlice = createSlice({
    name: 'pizzasCart',
    initialState,
    reducers: {
        setPizzaCart(state, action){
            state.pizzasCart = action.payload
        },
        setCountCart(state, action) {
			const val = state.pizzasCart.map((el) => {
				if (el.counter > 0 && action.payload === el.index) {
					return {...el, counter: el.counter + 1};
				} else {
					return el;
				}
			})
			state.pizzasCart  = val
		},
        setCountCartMinus(state, action) {
            const val = state.pizzasCart.map((el) => {
				if (el.counter > 0 && action.payload === el.index) {
					return {...el, 
                        counter: el.counter - 1
                    };
				} else {
					return el;
				}
			})
			state.pizzasCart  = val
        },
        setRemovePizza(state, action) {
            const val = state.pizzasCart.map((el) => {
				if (el.counter > 0 && action.payload === el.index) {
					return {...el, counter: 0};
				} else {
					return el;
				}
			})
			state.pizzasCart  = val
        },
        setClearCart(state, action) {
            const val = state.pizzasCart.map((el) => {
				return {...el, counter: 0};
			})
			state.pizzasCart  = val
        },
    },
})

export const {setPizzaCart, setCountCart, setCountCartMinus, setRemovePizza, setClearCart} = pizzaCartSlice.actions
export default pizzaCartSlice.reducer;