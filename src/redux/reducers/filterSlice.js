import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filter: {
        category: [],
        sort: [],
    },
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter(state, action) {
            state.filter = action.payload
        },
        setCategory(state, action) {
            state.filter.category = action.payload
        },
    },
})

export const {setFilter, setCategory} = filterSlice.actions
export default filterSlice.reducer