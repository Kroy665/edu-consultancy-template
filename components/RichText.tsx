'use client'

import React from 'react'

interface RichTextProps {
  content: any
  className?: string
}

export function RichText({ content, className = '' }: RichTextProps) {
  if (!content) return null

  // Parse if content is a JSON string
  let parsedContent = content
  if (typeof content === 'string') {
    try {
      parsedContent = JSON.parse(content)
    } catch {
      // If it's not JSON, treat it as HTML
      return <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
    }
  }

  // Serialize Lexical content to HTML
  const serializeNode = (node: any): string => {
    if (!node) return ''

    // Handle text nodes
    if (node.type === 'text') {
      let text = node.text || ''

      // Apply formatting
      if (node.format) {
        // Bold (format = 1)
        if (node.format & 1) {
          text = `<strong>${text}</strong>`
        }
        // Italic (format = 2)
        if (node.format & 2) {
          text = `<em>${text}</em>`
        }
        // Strikethrough (format = 4)
        if (node.format & 4) {
          text = `<s>${text}</s>`
        }
        // Underline (format = 8)
        if (node.format & 8) {
          text = `<u>${text}</u>`
        }
        // Code (format = 16)
        if (node.format & 16) {
          text = `<code>${text}</code>`
        }
      }

      return text
    }

    // Serialize children
    const children = node.children
      ? node.children.map((child: any) => serializeNode(child)).join('')
      : ''

    // Handle different node types
    switch (node.type) {
      case 'root':
        return children

      case 'paragraph':
        return children ? `<p>${children}</p>` : ''

      case 'heading':
        const tag = node.tag || 'h2'
        return `<${tag}>${children}</${tag}>`

      case 'list':
        const listTag = node.listType === 'number' ? 'ol' : 'ul'
        return `<${listTag}>${children}</${listTag}>`

      case 'listitem':
        return `<li>${children}</li>`

      case 'quote':
        return `<blockquote>${children}</blockquote>`

      case 'link':
        const url = node.fields?.url || node.url || '#'
        const newTab = node.fields?.newTab || node.newTab
        return `<a href="${url}"${newTab ? ' target="_blank" rel="noopener noreferrer"' : ''}>${children}</a>`

      case 'autolink':
        return `<a href="${node.url || '#'}">${children}</a>`

      case 'linebreak':
        return '<br />'

      case 'tab':
        return '&nbsp;&nbsp;&nbsp;&nbsp;'

      default:
        // For unknown types, just return children
        return children
    }
  }

  try {
    // Handle both formats: { root: {...} } and direct node structure
    const rootNode = parsedContent.root || parsedContent
    const html = serializeNode(rootNode)

    return html ? (
      <div className={`rich-text ${className}`} dangerouslySetInnerHTML={{ __html: html }} />
    ) : null
  } catch (error) {
    console.error('Error serializing rich text:', error, parsedContent)
    return (
      <div className={`rich-text ${className}`}>
        <p className="text-neutral-500 italic">Content format not supported</p>
      </div>
    )
  }
}
