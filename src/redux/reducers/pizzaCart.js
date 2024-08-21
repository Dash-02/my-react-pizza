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
    },
})

export const {setPizzaCart} = pizzaCartSlice.actions
export default pizzaCartSlice.reducer;