import storage from '../storage';

describe('storage', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('should set items in localStorage when call setItem', () => {
    const key = 'TEST_KEY';
    const value = 'TEST_VALUE';

    storage.setItem<string>(key, JSON.stringify(value));

    expect('TEST_KEY' in localStorage).toBe(true);
  });

  describe('when call getItem', () => {
    it('should return null if key does not exist', () => {
      const storedValue = storage.getItem<string>('NONEXISTENT_KEY');

      expect(storedValue).toBeNull();
    });

    it('should return value if key exists', () => {
      const key = 'TEST_KEY';
      const value = 'TEST_VALUE';
      localStorage.setItem(key, JSON.stringify(value));

      const storedValue = storage.getItem<string>(key);

      expect(storedValue).toBe(value);
    });
  });

  it('should remove items from localStorage when call removeItem', () => {
    const key = 'TEST_KEY';
    const value = 'TEST_VALUE';
    localStorage.setItem(key, JSON.stringify(value));

    storage.removeItem(key);

    expect('TEST_KEY' in localStorage).toBe(false);
  });
});
