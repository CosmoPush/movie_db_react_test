import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IGenres} from "../../Models/IGenres.ts";
import {getGenres} from "../../services/getMovies.ts";

type genreNameStoreSliceType = {
    genres: IGenres[]
}
const initState: genreNameStoreSliceType = {genres: []}
const loadGenres = createAsyncThunk('genreNameStoreSlice/loadGenres',
    async (_,thunkAPI)=>{
    const genres = await getGenres()
        return thunkAPI.fulfillWithValue(genres)
    }
    )
export const genreNameStoreSlice = createSlice({
    name: "genreNameStoreSlice",
    initialState: initState,
    reducers: {},
    extraReducers: builder => builder.addCase(loadGenres.fulfilled, (state, action:PayloadAction<IGenres[]>) => {
        state.genres = action.payload
    })

})

export const genresNameActions = {...genreNameStoreSlice.actions,loadGenres}