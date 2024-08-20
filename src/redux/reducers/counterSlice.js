import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	pizzasBlock:[
	{
		index: null,
    	counter: 0,
		title: '',
        image: '',
		size: [],
		type: [],
		price: [],
	}
  ]
}

  const counterSlice = createSlice({
	name: 'pizzasBlock',
	initialState,
	reducers: {
		setPizzaBlock(state, action) {
			state.pizzasBlock = action.payload
		}
	},
})

export const { setPizzaBlock } =  counterSlice.actions
export default counterSlice.reducer