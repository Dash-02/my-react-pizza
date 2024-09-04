import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filter: {
        category: null,
        sort: {
            nameSort: 'популярности',
            sortType: 'rating',
        },
    },
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSort(state, action) {
            state.filter.sort = action.payload
        },
        setCategory(state, action) {
            state.filter.category = action.payload
        },
    },
})

export const {setSort, setCategory} = filterSlice.actions
export default filterSlice.reducer