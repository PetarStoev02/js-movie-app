// OMDb API Configuration
// Environment variables are prefixed with VITE_ to be exposed to the client
// Get your free API key from: https://www.omdbapi.com/apikey.aspx

export const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;
export const OMDB_BASE_URL = import.meta.env.VITE_OMDB_BASE_URL || 'https://www.omdbapi.com/';
