import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type genreStoreSliceType = {
    genres:number[]
    buttonState:string
}

const initState:genreStoreSliceType= {genres : [],buttonState:'unactive'}
export const genreStoreSlice = createSlice({
    name:"genderStoreSlice",
    initialState:initState,
    reducers:{
        toggleGenre: (state, action: PayloadAction<number>) => {
            if (state.genres.includes(action.payload)) {
                state.genres = state.genres.filter(id => id !== action.payload);
                state.buttonState = 'unactive'
            } else {
                state.genres.push(action.payload);
                state.buttonState = "active"
            }
        },
        clearAllGenres: (state) => {
            state.genres = [];
            state.buttonState = 'unactive';
        }

    }
})

export const genresStoreSliceActions = {
    ...genreStoreSlice.actions
}