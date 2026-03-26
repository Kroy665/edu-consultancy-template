#!/usr/bin/env node

/**
 * Post-process the generated importMap.ts to add Vercel Blob Storage component
 * This is needed because the auto-generation doesn't detect the component properly
 */

const fs = require('fs')
const path = require('path')

const importMapPaths = [
  path.join(__dirname, '../app/(payload)/admin/[[...segments]]/importMap.ts'),
  path.join(__dirname, '../app/(payload)/importMap.ts'),
]

function fixImportMap(importMapPath) {
  if (!fs.existsSync(importMapPath)) {
    console.log(`⊘ Import map not found: ${path.basename(importMapPath)}`)
    return false
  }

  try {
    let content = fs.readFileSync(importMapPath, 'utf8')

    // Check if already has Vercel Blob import
    if (content.includes('@payloadcms/storage-vercel-blob/client')) {
      console.log(`✓ ${path.basename(path.dirname(importMapPath))}/importMap.ts already has Vercel Blob`)
      return true
    }

    // Find the last import statement
    const lastImportMatch = content.match(/import .* from ['"]@payloadcms\/[^'"]+['"]\n/)
    if (!lastImportMatch) {
      console.error(`✗ Could not find import statements in ${path.basename(importMapPath)}`)
      return false
    }

    const lastImportIndex = content.lastIndexOf(lastImportMatch[0]) + lastImportMatch[0].length

    // Add the Vercel Blob import
    const vercelBlobImport = `import { VercelBlobClientUploadHandler } from '@payloadcms/storage-vercel-blob/client'\n`
    content = content.slice(0, lastImportIndex) + vercelBlobImport + content.slice(lastImportIndex)

    // Find the last entry in the importMap object (before the closing brace)
    const importMapMatch = content.match(/export const importMap = \{[\s\S]*\}/)
    if (!importMapMatch) {
      console.error(`✗ Could not find importMap object in ${path.basename(importMapPath)}`)
      return false
    }

    // Add the Vercel Blob entry to the importMap
    content = content.replace(
      /(@payloadcms\/next\/rsc#CollectionCards":[^\n]+)\n\}/,
      '$1,\n  "@payloadcms/storage-vercel-blob/client#VercelBlobClientUploadHandler": VercelBlobClientUploadHandler\n}'
    )

    // Write the updated content
    fs.writeFileSync(importMapPath, content, 'utf8')
    console.log(`✓ Added Vercel Blob to ${path.basename(path.dirname(importMapPath))}/importMap.ts`)
    return true
  } catch (error) {
    console.error(`✗ Error fixing ${path.basename(importMapPath)}:`, error.message)
    return false
  }
}

// Fix all import map files
let allSuccess = true
importMapPaths.forEach(importMapPath => {
  const success = fixImportMap(importMapPath)
  if (!success) allSuccess = false
})

process.exit(allSuccess ? 0 : 1)
