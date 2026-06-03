import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ForsaTech – Your Opportunities, Oriented Around You',
  description: 'Connect with ODEJ opportunities across Algeria. Discover training programs, competitions, volunteering, and events tailored to your interests.',
  keywords: 'ODEJ, youth opportunities, Algeria, training, volunteering, events, فرصتك',
  authors: [{ name: 'ForsaTech' }],
  manifest: '/manifest.json',
  icons: { icon: '/icon.svg', apple: '/apple-icon.png' },
  openGraph: {
    title: 'ForsaTech – Your Opportunities, Oriented Around You',
    description: 'Algeria\'s youth opportunity matching platform',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#050510',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>
        <div className="noise" aria-hidden="true" />
        <div className="bg-grid fixed inset-0 pointer-events-none z-0" aria-hidden="true" />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
