import { NextAuthProvider } from "@/components/providers/session-provider"
import { Toaster } from "@/components/ui/sonner"
import "@/styles/globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html >
      <body >
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
        <Toaster />
      </body>
    </html>
  )
}