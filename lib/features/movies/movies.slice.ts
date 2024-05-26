import { SortMode } from "@/app/sort-select";
import { Movie } from "@/lib/types/movie";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SliceState = {
  movies: Movie[];
  sortMode: SortMode;
  error: string | null,
  nextPage: number,
};

const initialState = {
  movies: [],
  sortMode: "release_date_desc",
  error: null,
  nextPage: 1
} as SliceState;

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    appendList: (state, action: PayloadAction<Movie[]>) => {
      const movies = action.payload;
      state.movies = [...state.movies, ...movies];
    },
    updateList: (state, action: PayloadAction<Movie[]>) => {
      const movies = action.payload;
      state.movies = [...movies];
    },
    updateSortMode: (state, action: PayloadAction<SortMode>) => {
      state.sortMode = action.payload;
    },
    incrementPage: (state) => {
      state.nextPage += 1
    },
    resetPage: (state) => {
      state.nextPage = 1
    },
    resetError: (state) => {
      state.error = null
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    }
  },
});

export const { appendList, updateList, updateSortMode, incrementPage, resetPage, resetError, setError } = moviesSlice.actions;
export default moviesSlice.reducer;
