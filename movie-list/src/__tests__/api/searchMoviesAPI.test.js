import { describe, it, expect, beforeEach, vi } from 'vitest';
import { searchMovies } from '../../api/searchMoviesAPI';

// Mock the config module
vi.mock('../../api/config', () => ({
  OMDB_API_KEY: 'test_api_key',
  OMDB_BASE_URL: 'https://www.omdbapi.com/',
}));

describe('searchMoviesAPI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  describe('searchMovies', () => {
    it('should return empty results for empty search value', async () => {
      const result = await searchMovies('');
      expect(result).toEqual({ results: [] });
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should return empty results for whitespace-only search', async () => {
      const result = await searchMovies('   ');
      expect(result).toEqual({ results: [] });
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should return empty results for null search value', async () => {
      const result = await searchMovies(null);
      expect(result).toEqual({ results: [] });
    });

    it('should call fetch with correct URL', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ Response: 'False', Error: 'Movie not found!' }),
      });

      await searchMovies('batman');

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('batman')
      );
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('apikey=test_api_key')
      );
    });

    it('should transform OMDb response to expected format', async () => {
      const mockOmdbResponse = {
        Response: 'True',
        Search: [
          {
            imdbID: 'tt0372784',
            Title: 'Batman Begins',
            Year: '2005',
            Poster: 'https://example.com/batman.jpg',
            Type: 'movie',
          },
        ],
      };

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockOmdbResponse),
      });

      const result = await searchMovies('batman');

      expect(result.results).toHaveLength(1);
      expect(result.results[0]).toEqual({
        id: 'tt0372784',
        originalTitleText: { text: 'Batman Begins' },
        primaryImage: { url: 'https://example.com/batman.jpg' },
        releaseYear: { year: 2005 },
        titleType: { text: 'movie' },
      });
    });

    it('should handle N/A poster gracefully', async () => {
      const mockOmdbResponse = {
        Response: 'True',
        Search: [
          {
            imdbID: 'tt0000001',
            Title: 'No Poster Movie',
            Year: '2020',
            Poster: 'N/A',
            Type: 'movie',
          },
        ],
      };

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockOmdbResponse),
      });

      const result = await searchMovies('test');

      expect(result.results[0].primaryImage.url).toBeNull();
    });

    it('should return empty results when movie not found', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          Response: 'False',
          Error: 'Movie not found!',
        }),
      });

      const result = await searchMovies('xyznonexistent');

      expect(result).toEqual({ results: [] });
    });

    it('should handle HTTP errors gracefully', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const result = await searchMovies('batman');

      expect(result).toEqual({ results: [] });
    });

    it('should handle network errors gracefully', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await searchMovies('batman');

      expect(result).toEqual({ results: [] });
    });

    it('should encode special characters in search query', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ Response: 'False', Error: 'Movie not found!' }),
      });

      await searchMovies('batman & robin');

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('batman%20%26%20robin')
      );
    });
  });
});
