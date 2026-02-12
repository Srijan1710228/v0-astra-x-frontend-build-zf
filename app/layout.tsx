import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { WalletProvider } from '@/context/wallet-context'
import { Toaster } from 'sonner'

import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })

export const metadata: Metadata = {
  title: 'Astra-X | Autonomous Retail Intelligence Infrastructure',
  description: 'AI + Blockchain commerce platform. Predict. Simulate. Optimize. Execute.',
}

export const viewport: Viewport = {
  themeColor: '#0a0c10',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <WalletProvider>
          {children}
          <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'hsl(220, 18%, 7%)',
                border: '1px solid hsl(220, 13%, 16%)',
                color: 'hsl(210, 20%, 96%)',
              },
            }}
          />
        </WalletProvider>
      </body>
    </html>
  )
}
