import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    pizzasCart: {
        index: null,
        couunter: 0,
        size: null,
        type: null,
        price: null,
    }
}

const pizzaCartSlice = createSlice({
    name: 'pizzaCart',
    initialState,
    reducers: {
        setPizaCart(state, action){
            state.pizzaCart = action.payload
        },
    },
})

export const {setPizaCart} = pizzaCartSlice.actions
export default pizzaCartSlice;