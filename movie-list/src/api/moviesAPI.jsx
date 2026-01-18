import { OMDB_API_KEY, OMDB_BASE_URL } from './config';

// Movie categories with search terms for each
const MOVIE_CATEGORIES = {
  trending: ['avengers', 'batman', 'spider-man', 'star wars', 'frozen'],
  action: ['mission impossible', 'fast furious', 'john wick', 'die hard', 'terminator'],
  scifi: ['matrix', 'inception', 'interstellar', 'blade runner', 'alien'],
  classics: ['godfather', 'shawshank', 'forrest gump', 'pulp fiction', 'goodfellas'],
  comedy: ['hangover', 'superbad', 'bridesmaids', 'anchorman', 'ace ventura'],
  horror: ['conjuring', 'insidious', 'halloween', 'scream', 'nightmare elm'],
  drama: ['titanic', 'schindler', 'green mile', 'beautiful mind', 'rain man'],
};

// Category display names
export const CATEGORY_NAMES = {
  trending: 'Trending Now',
  action: 'Action & Adventure',
  scifi: 'Sci-Fi & Fantasy',
  classics: 'Classic Movies',
  comedy: 'Comedy',
  horror: 'Horror',
  drama: 'Drama',
};

// Transform OMDb movie data to internal format
const transformMovie = (movie) => ({
  id: movie.imdbID,
  originalTitleText: { text: movie.Title },
  primaryImage: { url: movie.Poster !== 'N/A' ? movie.Poster : null },
  releaseYear: { year: movie.Year ? parseInt(movie.Year) : null },
  titleType: { text: movie.Type },
  title: movie.Title,
  poster: movie.Poster !== 'N/A' ? movie.Poster : null,
  year: movie.Year,
});

// Fetch movies for a specific category
export const fetchMoviesByCategory = async (category) => {
  const searchTerms = MOVIE_CATEGORIES[category] || MOVIE_CATEGORIES.trending;
  const results = [];

  for (const term of searchTerms) {
    try {
      const url = `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(term)}&type=movie`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === 'True' && data.Search) {
        results.push(...data.Search.map(transformMovie));
      }
    } catch (error) {
      console.error(`Error fetching ${category}:`, error);
    }
  }

  // Remove duplicates and return
  const uniqueResults = [...new Map(results.map(m => [m.id, m])).values()];
  return uniqueResults.slice(0, 20);
};

// Fetch detailed info for a single movie (for hero section)
export const fetchMovieDetails = async (imdbId) => {
  try {
    const url = `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${imdbId}&plot=full`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === 'True') {
      return {
        id: data.imdbID,
        title: data.Title,
        plot: data.Plot,
        year: data.Year,
        rating: data.imdbRating,
        runtime: data.Runtime,
        genre: data.Genre,
        director: data.Director,
        actors: data.Actors,
        poster: data.Poster !== 'N/A' ? data.Poster : null,
        rated: data.Rated,
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

// Fetch all categories for the homepage
export const fetchAllCategories = async () => {
  const categories = Object.keys(MOVIE_CATEGORIES);
  const results = {};

  await Promise.all(
    categories.map(async (category) => {
      results[category] = await fetchMoviesByCategory(category);
    })
  );

  return results;
};

// Search movies by query
export const searchMovies = async (query) => {
  if (!query || query.trim().length < 2) {
    return [];
  }

  try {
    const url = `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}&type=movie`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === 'True' && data.Search) {
      return data.Search.map(transformMovie);
    }
    return [];
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

// Legacy function for backward compatibility
export const fetchMovies = async () => {
  const trending = await fetchMoviesByCategory('trending');
  return { results: trending };
};
