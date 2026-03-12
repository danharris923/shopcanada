/**
 * Shared 15-minute interval logic for deterministic rotation.
 * All shuffle/rotation systems use this for consistency.
 */

/**
 * Get the current 15-minute interval index.
 * Includes day-of-year for uniqueness across days (96 intervals/day).
 */
export function getIntervalIndex(): number {
  const now = new Date()
  const minutes = now.getHours() * 60 + now.getMinutes()
  const intervalIndex = Math.floor(minutes / 15)
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000)
  return dayOfYear * 96 + intervalIndex
}

/**
 * Seeded random number generator (sin-based)
 */
export function seededRandom(seed: number): () => number {
  let x = seed
  return () => {
    x = Math.sin(x) * 10000
    return x - Math.floor(x)
  }
}

/**
 * Fisher-Yates shuffle with seeded random
 */
export function shuffleArray<T>(array: T[], seed: number): T[] {
  const shuffled = [...array]
  const random = seededRandom(seed)
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
