export const getStoredJSON = (key, fallback = null) => {
  try {
    const value = localStorage.getItem(key)

    return value ? JSON.parse(value) : fallback
  } catch (error) {
    console.warn(`Invalid localStorage value for "${key}". Resetting it.`, error)
    localStorage.removeItem(key)
    return fallback
  }
}
