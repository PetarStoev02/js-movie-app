import { OMDB_API_KEY, OMDB_BASE_URL } from './config';

// Fetch movie details by IMDb ID using OMDb API
const fetchMovieById = async (imdbId) => {
  try {
    const url = `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${imdbId}&plot=short`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.Response === 'False') {
      console.error('OMDb API Error:', data.Error);
      return null;
    }
    
    // Transform OMDb data to match expected format
    return {
      id: data.imdbID,
      originalTitleText: {
        text: data.Title
      },
      primaryImage: {
        url: data.Poster !== 'N/A' ? data.Poster : null
      },
      releaseYear: {
        year: data.Year ? parseInt(data.Year) : null
      },
      titleType: {
        text: data.Type
      }
    };
  } catch (error) {
    console.error(`Error fetching movie ${imdbId}:`, error);
    return null;
  }
};

export const getMoviesByListType = async (movieList, listType) => {
  let moviesList = [];
  
  // Filter movies by list type
  movieList.forEach((element) => {
    if (element.list && element.list[0] === listType) {
      moviesList.push(element.movieId);
    }
  });
  
  if (moviesList.length === 0) {
    return { results: [] };
  }
  
  // Fetch movie details for each ID using OMDb API
  try {
    const moviePromises = moviesList.map(movieId => fetchMovieById(movieId));
    const movies = await Promise.all(moviePromises);
    
    // Filter out null results (failed fetches)
    const validMovies = movies.filter(movie => movie !== null);
    
    return { results: validMovies };
  } catch (error) {
    console.error('Error fetching movies by list type:', error);
    return { results: [] };
  }
};
