import { LocalStorage } from 'node-localstorage'
const storage = new LocalStorage('./.db')

export default {
  set(key: string, value): void {
    storage.setItem(key, JSON.stringify(value))
  },
  get(key: string) {
    return JSON.parse(storage.getItem(key))
  },
  delete(key: string): void {
    storage.removeItem(key)
  },
  clear(): void {
    storage.clear()
  }
}
