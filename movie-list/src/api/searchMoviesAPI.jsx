import { OMDB_API_KEY, OMDB_BASE_URL } from './config';

export const searchMovies = async (searchValue) => {
  if (!searchValue || searchValue.trim() === '') {
    return { results: [] };
  }

  try {
    // Check if API key is set
    if (!OMDB_API_KEY || OMDB_API_KEY === 'demo_key_replace_me') {
      console.warn('OMDb API key not set. Please set your API key in src/api/config.js');
      return { results: [] };
    }

    const url = `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(searchValue)}&type=movie`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.Response === 'False') {
      // No results found
      if (data.Error === 'Movie not found!' || data.Error === 'Too many results.') {
        return { results: [] };
      }
      if (data.Error && data.Error.includes('Invalid API key')) {
        console.error('Invalid OMDb API key. Please check your API key in src/api/config.js');
      } else {
        console.error('OMDb API Error:', data.Error);
      }
      return { results: [] };
    }
    
    // Transform OMDb data to match expected format
    const transformedResults = data.Search.map((movie) => ({
      id: movie.imdbID,
      originalTitleText: {
        text: movie.Title
      },
      primaryImage: {
        url: movie.Poster !== 'N/A' ? movie.Poster : null
      },
      releaseYear: {
        year: movie.Year ? parseInt(movie.Year) : null
      },
      titleType: {
        text: movie.Type
      }
    }));
    
    return { results: transformedResults };
  } catch (error) {
    console.error('Error searching movies:', error);
    return { results: [] };
  }
};
