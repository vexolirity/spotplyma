import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })

export const metadata: Metadata = {
  title: 'Spotplyma - Premium Media Downloader',
  description: 'Download music, videos from Spotify, TikTok, YouTube',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <Providers>
          <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950">
            <div className="fixed inset-0 animated-grid opacity-20 pointer-events-none" />
            <div className="relative z-10">{children}</div>
          </div>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1a1a1a',
                color: '#fff',
                border: '1px solid rgba(0, 255, 255, 0.2)',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
