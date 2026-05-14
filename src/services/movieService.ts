
import axios from 'axios';

import type { Movie } from "../types/movie";

interface MoviesResponse {

    results: Movie[];

}

const BASE_URL = import.meta.env.VITE_BASE_URL;

const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export const fetchMovies = async (

    query: string

): Promise<Movie[]> => {

    const response = await axios.get<MoviesResponse>(

        `${BASE_URL}/search/movie`,

        {

            params: {
                query,
                include_adult: false,
            },

            headers: {

                Authorization: `Bearer ${API_TOKEN}`,

            },

        }

    );

    return response.data.results;
};