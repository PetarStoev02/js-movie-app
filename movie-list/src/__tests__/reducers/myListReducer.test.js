import { describe, it, expect, beforeEach, vi } from 'vitest';
import myListReducer, {
  addToMyList,
  removeFromMyList,
  clearMyList
} from '../../reducers/myListReducer';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(global, 'localStorage', { value: localStorageMock });

describe('myListReducer', () => {
  const mockMovie = {
    id: 'tt1234567',
    Title: 'Test Movie',
    Year: '2024',
    Poster: 'http://example.com/poster.jpg',
  };

  const mockMovie2 = {
    id: 'tt7654321',
    Title: 'Another Movie',
    Year: '2023',
    Poster: 'http://example.com/poster2.jpg',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  describe('initial state', () => {
    it('should return initial state with empty movies array', () => {
      const state = myListReducer(undefined, { type: 'unknown' });
      expect(state).toEqual({ movies: [] });
    });
  });

  describe('addToMyList', () => {
    it('should add a movie to empty list', () => {
      const initialState = { movies: [] };
      const state = myListReducer(initialState, addToMyList(mockMovie));

      expect(state.movies).toHaveLength(1);
      expect(state.movies[0].id).toBe(mockMovie.id);
      expect(state.movies[0].Title).toBe(mockMovie.Title);
      expect(state.movies[0].addedAt).toBeDefined();
    });

    it('should not add duplicate movie', () => {
      const initialState = {
        movies: [{ ...mockMovie, addedAt: Date.now() }]
      };
      const state = myListReducer(initialState, addToMyList(mockMovie));

      expect(state.movies).toHaveLength(1);
    });

    it('should add multiple different movies', () => {
      const initialState = { movies: [] };
      let state = myListReducer(initialState, addToMyList(mockMovie));
      state = myListReducer(state, addToMyList(mockMovie2));

      expect(state.movies).toHaveLength(2);
    });

    it('should save to localStorage when adding', () => {
      const initialState = { movies: [] };
      myListReducer(initialState, addToMyList(mockMovie));

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'movieflix-mylist',
        expect.any(String)
      );
    });
  });

  describe('removeFromMyList', () => {
    it('should remove a movie by id', () => {
      const initialState = {
        movies: [
          { ...mockMovie, addedAt: Date.now() },
          { ...mockMovie2, addedAt: Date.now() }
        ]
      };
      const state = myListReducer(initialState, removeFromMyList(mockMovie.id));

      expect(state.movies).toHaveLength(1);
      expect(state.movies[0].id).toBe(mockMovie2.id);
    });

    it('should handle removing non-existent movie', () => {
      const initialState = {
        movies: [{ ...mockMovie, addedAt: Date.now() }]
      };
      const state = myListReducer(initialState, removeFromMyList('non-existent'));

      expect(state.movies).toHaveLength(1);
    });

    it('should save to localStorage when removing', () => {
      const initialState = {
        movies: [{ ...mockMovie, addedAt: Date.now() }]
      };
      myListReducer(initialState, removeFromMyList(mockMovie.id));

      expect(localStorageMock.setItem).toHaveBeenCalled();
    });
  });

  describe('clearMyList', () => {
    it('should clear all movies', () => {
      const initialState = {
        movies: [
          { ...mockMovie, addedAt: Date.now() },
          { ...mockMovie2, addedAt: Date.now() }
        ]
      };
      const state = myListReducer(initialState, clearMyList());

      expect(state.movies).toHaveLength(0);
    });

    it('should save empty array to localStorage', () => {
      const initialState = {
        movies: [{ ...mockMovie, addedAt: Date.now() }]
      };
      myListReducer(initialState, clearMyList());

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'movieflix-mylist',
        '[]'
      );
    });
  });
});
