import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

/**
 * Helper to read brand story markdown files
 * Brand stories are stored in src/content/brands/stories/{slug}.md
 */

const BRAND_STORIES_DIR = path.join(process.cwd(), 'src/content/brands/stories')

/**
 * Read a brand story markdown file and return the content (without frontmatter)
 */
export async function getBrandStory(slug: string): Promise<string | null> {
  const filePath = path.join(BRAND_STORIES_DIR, `${slug}.md`)

  if (!existsSync(filePath)) {
    return null
  }

  try {
    const content = await readFile(filePath, 'utf-8')

    // Remove frontmatter (content between --- markers at the start)
    const frontmatterMatch = content.match(/^---\n[\s\S]*?\n---\n/)
    if (frontmatterMatch) {
      return content.slice(frontmatterMatch[0].length).trim()
    }

    return content.trim()
  } catch (error) {
    // Error reading file - return null
    return null
  }
}

/**
 * Check if a brand story exists
 */
export function hasBrandStory(slug: string): boolean {
  const filePath = path.join(BRAND_STORIES_DIR, `${slug}.md`)
  return existsSync(filePath)
}

/**
 * Convert markdown content to HTML (basic conversion)
 * For more complex markdown, consider using a library like marked or remark
 */
export function markdownToHtml(markdown: string): string {
  let html = markdown

  // Convert headers
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>')

  // Convert bold and italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')

  // Convert links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

  // Convert paragraphs (lines separated by double newlines)
  html = html.split(/\n\n+/).map(para => {
    // Don't wrap if it's already a block element
    if (para.startsWith('<h') || para.startsWith('<ul') || para.startsWith('<ol')) {
      return para
    }
    return `<p>${para.replace(/\n/g, ' ')}</p>`
  }).join('\n')

  return html
}
