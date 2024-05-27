import { SortMode } from "@/app/sort-select"
import { Movie } from "@/lib/types/movie"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { fetchNextMovies } from "./movies.actions"

interface SliceState {
  movies: Movie[]
  sortMode: SortMode
  nextPage: number
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState = {
  movies: [],
  sortMode: "release_date_desc",
  error: null,
  nextPage: 1,
  status: "idle",
} as SliceState

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    appendList: (state, action: PayloadAction<Movie[]>) => {
      const movies = action.payload
      state.movies = [...state.movies, ...movies]
    },
    updateList: (state, action: PayloadAction<Movie[]>) => {
      const movies = action.payload
      state.movies = [...movies]
    },
    updateSortMode: (state, action: PayloadAction<SortMode>) => {
      state.sortMode = action.payload
    },
    resetPage: (state) => {
      state.nextPage = 1
    },
    resetError: (state) => {
      state.error = null
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNextMovies.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchNextMovies.fulfilled, (state, action) => {
        const { shouldReset, movies } = action.payload

        state.status = "succeeded"
        if (shouldReset) {
          state.movies = movies
          state.nextPage = 2
        } else {
          state.movies = [...state.movies, ...movies]
          state.nextPage += 1
        }
      })
      .addCase(fetchNextMovies.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch movies"
      })
  },
})

export const { appendList, updateList, updateSortMode, resetPage, resetError, setError } =
  moviesSlice.actions
export default moviesSlice.reducer
