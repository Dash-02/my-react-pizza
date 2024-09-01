import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    data: [],
    status: '',
} 

export const fetchPizza = createAsyncThunk(
    'pizza/fetchPizza',
    async ({categoryId, strSort, search, currentPage}) => {
       
		const sortByConst = strSort.replaceAll('-', '');
		const orderSort = strSort.includes('-') ? 'asc' : 'desc';
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const searchValue = search ? `search=${search}` : '';
		const page = `page=${currentPage}`;

        const response = await axios.get(`https://65d118f5ab7beba3d5e4176b.mockapi.io/items?${page}&limit=4&` +
			`${category}${searchValue}&sortBy=${sortByConst}&order=${orderSort}`)
        return response;
    }
  );

  const FetchDataObjectSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		setData(state, action) {
			state.data = action.payload
			state.status = 'success'
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchPizza.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(fetchPizza.fulfilled, (state, action) => {
				state.data = action.payload.data
				state.status = 'success'
			})
			.addCase(fetchPizza.rejected, (state, action) => {
				state.data = []
				state.status = 'error'
			})
	},
})

export const { setData } =  FetchDataObjectSlice.actions
export default FetchDataObjectSlice.reducer