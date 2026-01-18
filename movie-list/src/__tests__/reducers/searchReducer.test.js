import { describe, it, expect } from 'vitest';
import searchReducer, { setSearchQuery } from '../../reducers/searchReducer';

describe('searchReducer', () => {
  it('should return the initial state', () => {
    expect(searchReducer(undefined, { type: 'unknown' })).toBe('');
  });

  it('should handle setSearchQuery with a string', () => {
    const newState = searchReducer('', setSearchQuery('batman'));
    expect(newState).toBe('batman');
  });

  it('should handle setSearchQuery with empty string', () => {
    const newState = searchReducer('previous', setSearchQuery(''));
    expect(newState).toBe('');
  });

  it('should replace previous search query', () => {
    const state1 = searchReducer('', setSearchQuery('batman'));
    const state2 = searchReducer(state1, setSearchQuery('spider'));
    expect(state2).toBe('spider');
  });

  it('should handle special characters in search query', () => {
    const newState = searchReducer('', setSearchQuery('batman & robin'));
    expect(newState).toBe('batman & robin');
  });
});
