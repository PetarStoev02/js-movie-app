import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";

import CardActionsComponent from "./CardActionsComponent";
import { fetchMovies } from "../../api/moviesAPI";
import { searchMovies } from "../../api/searchMoviesAPI";
import { setMovies } from "../../reducers/movieReducer";
import { setSearchQuery } from "../../reducers/searchReducer";

import SearchBar from "../SearchBar/SearchBar"; // Import the SearchBar component

export default function Cards() {
  const movies = useSelector((state) => state.movies);
  const searchQuery = useSelector((state) => state.searchQuery);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchQuery) {
      searchMoviesData(searchQuery);
    } else {
      fetchMoviesData();
    }
  }, [searchQuery]);

  const fetchMoviesData = () => {
    fetchMovies()
      .then((data) => {
        dispatch(setMovies(data.results));
      })
      .catch((error) => console.error("Error fetching movies:", error));
  };

  const searchMoviesData = (query) => {
    searchMovies(query)
      .then((data) => {
        dispatch(setMovies(data.results));
      })
      .catch((error) => console.error("Error searching movies:", error));
  };

  const handleSearchQueryChange = (value) => {
    dispatch(setSearchQuery(value));
  };

  return (
    <div>
      <SearchBar onSearchChange={handleSearchQueryChange} />
      {movies.length === 0 ? (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            {searchQuery ? 'No movies found. Try a different search term.' : 'Loading movies...'}
          </Typography>
          {!searchQuery && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Make sure you have set up your OMDb API key in src/api/config.js
            </Typography>
          )}
        </div>
      ) : (
        <Grid container spacing={2}>
          {movies.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ maxWidth: 400, maxHeight: 500 }}>
                <CardContent>
                  <Typography
                    component="p"
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {movie.originalTitleText?.text || 'Unknown Title'}
                  </Typography>

                  {movie.primaryImage && movie.primaryImage.url ? (
                    <CardMedia
                      component="img"
                      height="300"
                      image={movie.primaryImage.url}
                      alt={movie.originalTitleText?.text || 'Movie poster'}
                      sx={{ objectFit: 'contain' }}
                    />
                  ) : (
                    <div style={{ 
                      height: '300px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      backgroundColor: '#f5f5f5'
                    }}>
                      <Typography variant="body2" color="text.secondary">
                        No image available
                      </Typography>
                    </div>
                  )}
                </CardContent>
                <CardActionsComponent cardId={movie.id} />
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
