import db from './db'

describe('FakeDatabase',  () => {
  it('should store a string', () => {
    db.set('key', 'value')
    db.set('key1', '1')
    expect(db.get('key')).toEqual('value')
    expect(typeof db.get('key1')).toEqual('string')
  })
  it('should store an object', () => {
    db.set('key2', { a: 1 })
    expect(typeof db.get('key2')).toEqual('object')
  })
  it('should store a number', () => {
    db.set('key3', 1)
    expect(typeof db.get('key3')).toEqual('number')
  })
  it('should delete a key', () => {
    db.delete('key3')
    expect(db.get('key3')).toEqual(null)
  })
  it('should clear all', () => {
    db.clear()
    expect(db.get('key1')).toEqual(null)
    expect(db.get('key2')).toEqual(null)
    expect(db.get('key3')).toEqual(null)
  })
})