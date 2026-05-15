
import { useState } from 'react';

import { fetchMovies } from '../services/movieService';

import  type { Movie } from '../../types/movie.ts';

import { SearchBar } from '../../components/SearchBar/SearchBar';

import { MovieGrid } from '../../components/MovieGrid/MovieGrid';

import  Loader  from '../../components/Loader/Loader';

import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';

import { MovieModal } from '../../components/MovieModal/MovieModal';

import  { Toaster } from 'react-hot-toast';

import { useQuery } from '@tanstack/react-query';

import ReactPaginate from 'react-paginate';

export default function App() {

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const {data, isLoading, isError} = useQuery({
    queryKey: ['movies', searchQuery, currentPage],
    queryFn: () => fetchMovies(searchQuery, currentPage),
    enabled: !!searchQuery,
  })

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);

  };
 const handlePageChange = ({ selected }: { selected: number }) => {
   setCurrentPage(selected + 1);
 };

  return (
    <>
    
      <Toaster />

      <SearchBar onSubmit={handleSearch} />
      
      {isLoading && <Loader />}

      {isError && <ErrorMessage message="Something went wrong" />}


      {!isLoading && !isError && data?.results?.length > 0 && (

        <MovieGrid movies={data.results} onSelect={setSelectedMovie} />

      )}

  <ReactPaginate

    pageCount={data?.total_pages || 0}

    pageRangeDisplayed={5}

    marginPagesDisplayed={1}

    onPageChange={handlePageChange}

    forcePage={currentPage - 1}

    previousLabel="<"

    nextLabel=">"

  />

      {selectedMovie && (

        <MovieModal

          movie={selectedMovie}

          onClose={() => setSelectedMovie(null)}
        />

      )}

    </>
  );
}
     