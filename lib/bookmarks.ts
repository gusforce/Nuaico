const STORAGE_KEY = 'nuaico-bookmarks'

function getStorage(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function setStorage(bookmarks: string[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
}

export function getBookmarks(): string[] {
  return getStorage()
}

export function addBookmark(slug: string) {
  const bookmarks = getStorage()
  if (!bookmarks.includes(slug)) {
    bookmarks.push(slug)
    setStorage(bookmarks)
  }
}

export function removeBookmark(slug: string) {
  const bookmarks = getStorage().filter(s => s !== slug)
  setStorage(bookmarks)
}

export function isBookmarked(slug: string): boolean {
  return getStorage().includes(slug)
}

export function toggleBookmark(slug: string): boolean {
  if (isBookmarked(slug)) {
    removeBookmark(slug)
    return false
  } else {
    addBookmark(slug)
    return true
  }
}
