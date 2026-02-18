'use client'

/**
 * Image that hides itself (or its container) when the source fails to load.
 * Use in server components where you can't attach onError to a plain <img>.
 */
export function SafeImg({
  hideParent,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & {
  /** If true, hide the closest parent element instead of just the image */
  hideParent?: boolean
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img
      {...props}
      onError={(e) => {
        if (hideParent) {
          const parent = e.currentTarget.parentElement
          if (parent) parent.style.display = 'none'
        } else {
          e.currentTarget.style.display = 'none'
        }
      }}
    />
  )
}
