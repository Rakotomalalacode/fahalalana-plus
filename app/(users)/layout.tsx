import Decouvrir from '@/components/Decouvrir/Decouvrir'
import Footer from '@/components/footer/Footer'
import NavbarTow from '@/components/headers/headersuser/page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Falarohy',
  description: 'leargning your way',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <div className="w-full lg:sticky z-50 lg:top-0">
        <NavbarTow />
      </div>
      <div className="w-[95%] m-auto rounded sticky bg-primary-foreground mt-2 mb-2 px-4 lg:hidden block">
        <Decouvrir />
      </div>

      <div className="mt-0">
        {children}
      </div>

      <div className='w-full'>
        <Footer />
      </div>
    </main>
  )
}