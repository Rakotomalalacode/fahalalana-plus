import { SidebarProviderCustom } from '@/components/context/SidebarContext'
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Falarohy | Formation',
  description: 'leargning your way',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
  <main>
    {children}
  </main>
  
  )
}