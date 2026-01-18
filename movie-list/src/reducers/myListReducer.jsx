import { createSlice } from '@reduxjs/toolkit';

// Load from localStorage
const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem('movieflix-mylist');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Save to localStorage
const saveToStorage = (movies) => {
  try {
    localStorage.setItem('movieflix-mylist', JSON.stringify(movies));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const initialState = {
  movies: loadFromStorage(),
};

const myListSlice = createSlice({
  name: 'myList',
  initialState,
  reducers: {
    addToMyList: (state, action) => {
      const movie = action.payload;
      if (!state.movies.some(m => m.id === movie.id)) {
        state.movies.push({
          ...movie,
          addedAt: Date.now(),
        });
        saveToStorage(state.movies);
      }
    },
    removeFromMyList: (state, action) => {
      const movieId = action.payload;
      state.movies = state.movies.filter(m => m.id !== movieId);
      saveToStorage(state.movies);
    },
    clearMyList: (state) => {
      state.movies = [];
      saveToStorage([]);
    },
  },
});

export const { addToMyList, removeFromMyList, clearMyList } = myListSlice.actions;
export default myListSlice.reducer;
