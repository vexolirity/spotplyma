export const isValidUrl = (url: string) => { try { new URL(url); return true } catch { return false } }
export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)