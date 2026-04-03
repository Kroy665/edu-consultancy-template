'use client'

import React from 'react'

export const DownloadEnquiriesButton = () => {
  const [isDownloading, setIsDownloading] = React.useState(false)

  const handleDownload = async () => {
    try {
      setIsDownloading(true)

      const response = await fetch('/api/enquiries/export', {
        method: 'GET',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to download enquiries')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url

      const contentDisposition = response.headers.get('Content-Disposition')
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/)
      const filename = filenameMatch ? filenameMatch[1] : `enquiries_${new Date().toISOString().split('T')[0]}.csv`

      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading enquiries:', error)
      alert('Failed to download enquiries. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        type="button"
        style={{
          padding: '10px 20px',
          backgroundColor: isDownloading ? '#9ca3af' : '#1A4D3A',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: isDownloading ? 'not-allowed' : 'pointer',
          fontSize: '14px',
          fontWeight: '600',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          if (!isDownloading) {
            e.currentTarget.style.backgroundColor = '#0f3a2a'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }
        }}
        onMouseLeave={(e) => {
          if (!isDownloading) {
            e.currentTarget.style.backgroundColor = '#1A4D3A'
            e.currentTarget.style.transform = 'translateY(0)'
          }
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        {isDownloading ? 'Downloading CSV...' : 'Download All as CSV'}
      </button>
    </div>
  )
}
