'use client'

export function ScrollToTopButton() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="btn-primary"
    >
      Back to Top
    </button>
  )
}