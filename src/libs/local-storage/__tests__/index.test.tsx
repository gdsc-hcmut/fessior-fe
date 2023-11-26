import storage, { setItem, getItem } from '../index';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('setItem', () => {
    it('should set an item in local storage', () => {
      setItem('foo', 'bar');
      expect(localStorage.getItem('foo')).toBe(JSON.stringify('bar'));
    });
  });

  describe('getItem', () => {
    it('should get an item from local storage', () => {
      localStorage.setItem('foo', JSON.stringify('bar'));
      expect(getItem('foo')).toBe('bar');
    });

    it('should return null if item does not exist', () => {
      expect(getItem('foo')).toBeNull();
    });
  });

  describe('default export', () => {
    it('should export setItem and getItem functions', () => {
      expect(storage.setItem).toBe(setItem);
      expect(storage.getItem).toBe(getItem);
    });
  });
});
