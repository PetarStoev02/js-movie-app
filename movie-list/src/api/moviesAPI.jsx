import { OMDB_API_KEY, OMDB_BASE_URL } from './config';

// Popular movie search terms to get trending movies
const POPULAR_SEARCH_TERMS = [
  'batman', 'superman', 'avengers', 'spider', 'star wars', 
  'inception', 'matrix', 'titanic', 'avatar', 'jurassic'
];

// Get a random popular search term
const getRandomSearchTerm = () => {
  return POPULAR_SEARCH_TERMS[Math.floor(Math.random() * POPULAR_SEARCH_TERMS.length)];
};

export const fetchMovies = async () => {
  try {
    // Check if API key is set
    if (!OMDB_API_KEY || OMDB_API_KEY === 'demo_key_replace_me') {
      console.warn('OMDb API key not set. Please set your API key in src/api/config.js');
      return { results: [] };
    }

    // Search for popular movies
    const searchTerm = getRandomSearchTerm();
    const url = `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(searchTerm)}&type=movie&page=1`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.Response === 'False') {
      if (data.Error && data.Error.includes('Invalid API key')) {
        console.error('Invalid OMDb API key. Please check your API key in src/api/config.js');
      } else {
        console.error('OMDb API Error:', data.Error);
      }
      return { results: [] };
    }
    
    // Transform OMDb data to match expected format
    const transformedResults = data.Search.map((movie, index) => ({
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
    console.error('Error fetching movies:', error);
    return { results: [] };
  }
};
