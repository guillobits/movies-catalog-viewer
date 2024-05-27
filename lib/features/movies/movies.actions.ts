import { fetchMovies } from "@/api/movies"
import { RootState } from "@/lib/store"
import { Movie } from "@/lib/types/movie"
import { createAsyncThunk } from "@reduxjs/toolkit"

export interface FetchNextMoviesRetType {
  movies: Movie[]
  shouldReset: boolean
}

export const fetchNextMovies = createAsyncThunk<
  FetchNextMoviesRetType,
  boolean,
  { state: RootState }
>("movies/fetchNextMovies", async (shouldReset, { getState, rejectWithValue }) => {
  try {
    const state = getState()
    const { nextPage, sortMode } = state.movies

    const pageToFetch = shouldReset ? 1 : nextPage
    const movies = await fetchMovies(sortMode, pageToFetch)
    return { movies, shouldReset }
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})
