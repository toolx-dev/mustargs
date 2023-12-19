const mustargs = require('../src/index').default

describe('mustargs', () => {
  it('should parse simple key-value pairs', () => {
    const args = ['-i', 'images']
    expect(mustargs(args)).toEqual({ i: 'images' })
  })

  it('should parse simple key-value pairs with array', () => {
    const args = ['-i', 'images', 'text']
    expect(mustargs(args)).toEqual({ i: ['images', 'text']})
  })

  it('should parse nested objects', () => {
    const args = ['--foo', 'a.b=1', 'a.c=2']
    expect(mustargs(args)).toEqual({ foo: { a: { b: 1, c: 2 } } })
  })

  it('should handle arrays and mixed types', () => {
    const args = ['--foo', 'a.b=1,2,3', 'a.c=hello', 'a.d=4.5']
    expect(mustargs(args)).toEqual({ foo: { a: { b: [1, 2, 3], c: 'hello', d: 4.5 } } })
  })

  it('should support multiple keys', () => {
    const args = ['-i', 'images', '--size', '1920x1080', '--format', 'jpeg']
    expect(mustargs(args)).toEqual({ i: 'images', size: '1920x1080', format: 'jpeg' })
  })

  it('should handle complex nested structures', () => {
    const args = ['--config', 'database.host=localhost', 'database.port=5432', 'server.enabled=true', 'server.port=8080', '-i', 'images', 'text', '--foo', 'a.b=1', 'a.c=2', '-u', 'images']
    expect(mustargs(args)).toEqual({
      config: {
        database: { host: 'localhost', port: 5432 },
        server: { enabled: true, port: 8080 }
      },
      i: ['images', 'text'],
      u: 'images',
      foo: { a: { b: 1, c: 2 } }
    })
  })
})
