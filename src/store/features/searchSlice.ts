import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
    query: string;
    currentPage: number;
}

const initialState: SearchState = {
    query: '',
    currentPage: 1
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        }
    }
});

export const { setQuery, setCurrentPage } = searchSlice.actions;
export default searchSlice.reducer;
