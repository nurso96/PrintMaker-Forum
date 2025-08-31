import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/layout/theme-provider"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: "CAD AI Forum - Community Hub for AI-Powered CAD",
    template: "%s | CAD AI Forum"
  },
  description: "Join the premier community for AI-powered CAD enthusiasts. Share projects, learn techniques, and collaborate on cutting-edge 3D modeling workflows.",
  keywords: ["CAD", "AI", "3D modeling", "forum", "community", "OpenSCAD", "STL", "3D printing"],
  authors: [{ name: "CAD AI Forum Team" }],
  creator: "CAD AI Forum",
  metadataBase: new URL("https://forum.cadai.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://forum.cadai.com",
    title: "CAD AI Forum",
    description: "Community hub for AI-powered CAD enthusiasts",
    siteName: "CAD AI Forum",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CAD AI Forum"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "CAD AI Forum",
    description: "Community hub for AI-powered CAD enthusiasts",
    images: ["/og-image.png"],
    creator: "@cadaiforum"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  verification: {
    google: "your-google-verification-code",
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body 
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}