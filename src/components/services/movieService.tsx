
import  type { Movie } from '../../types/movie.ts';

interface MovieResponse {

  results: Movie[];

}
const API_TOKEN = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export const fetchMovies = async (query: string): Promise<Movie[]> => {

  const response = await fetch(

    `${BASE_URL}/search/movie?query=${query}`,

    {
      headers: {

        Authorization: `Bearer ${API_TOKEN}`,
      },

    }

  );

  if (!response.ok) {

    throw new Error('Failed to fetch movies');

  }

  const data: MovieResponse = await response.json();

  return data.results;
};