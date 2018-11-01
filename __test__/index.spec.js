import cachest from '../src';

describe('cachest', () => {
  describe('Test keys', () => {
    test('empty', () => {
      const result = cachest.keys();
      expect(result).toEqual([]);
    })

    test('keys', () => {
      cachest.set('a', 1);
      cachest.set('b', 2);
      cachest.set('c', 3);
      const result = cachest.keys();
      expect(result).toEqual(['a', 'b', 'c']);
    })

    test('keys without expire', async () => {
      cachest.set('d', 4, 1000);
      const result = await new Promise(resolve => {
        setTimeout(() => {
          resolve(cachest.keys());
        }, 1500);

      })
      expect(result).toEqual(['a', 'b', 'c']);
    })
  });

  describe('Test size', () => {
    test('size', () => {
      cachest.del('d');
      const result = cachest.size();
      expect(result).toBe(3);
    })
  });

  describe('Test set/get', () => {
    test('cache string', () => {
      cachest.set('hello', 'world');
      const result = cachest.get('hello');
      expect(result).toBe('world');
    })

    test('cache number', () => {
      cachest.set('number', 1234);
      const result = cachest.get('number');
      expect(result).toBe(1234);
    })

    test('cache object', () => {
      cachest.set('cache_object', {
        string: 'hello',
        number: 12,
        null: null,
        bool: true,
        array: [1, '2'],
        object: {a: 1, b: 2}
      });
      const result = cachest.get('cache_object');

      expect(result).toEqual({
        string: 'hello',
        number: 12,
        null: null,
        bool: true,
        array: [1, '2'],
        object: {a: 1, b: 2}
      })
    })

    test('cache data expire', async () => {
      cachest.set('data', 1234, 1000);
      let result = await new Promise(resolve => {
        setTimeout(() => {
          const val = cachest.get('data');
          resolve(val);
        }, 500);
      })
      expect(result).toBe(1234);
      result = await new Promise(resolve => {
        setTimeout(() => {
          const val = cachest.get('data');
          resolve(val);
        }, 1500);
      })

      expect(result).toBe(null);
    })
  });

  describe('Test get', () => {
    test('get not exist', () => {
      const result = cachest.get('not_exist');
      expect(result).toBe(null);
    })
  });

  describe('Test isExpire', () => {
    test('check not exist', () => {
      const result = cachest.isExpire('not_exist');
      expect(result).toBe(true);
    })

    test('check not expired', async () => {
      cachest.set('expired', 1234, 1000);
      let result = cachest.isExpire('expired');
      expect(result).toBe(false);

      result = await new Promise(resolve => {
        setTimeout(() => {
          const val = cachest.isExpire('expired');
          resolve(val);
        }, 1500);
      })
      expect(result).toBe(true);
    })

    test('check not set expire', async () => {
      cachest.set('noexpired', 12345);
      const result = await new Promise(resolve => {
        setTimeout(() => {
          const val = cachest.isExpire('noexpired');
          resolve(val);
        }, 1000);
      })
      expect(result).toBe(false);
    });
  });

  test('del', () => {
    cachest.set('hello', 'world');
    let result = cachest.get('hello');
    expect(result).toBe('world');
    cachest.del('hello');
    result = cachest.get('hello');
    expect(result).toBe(null);
  });
})
