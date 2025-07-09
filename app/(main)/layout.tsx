import { SidebarProviderCustom } from '@/components/context/SidebarContext'

import Decouvrir from '@/components/Decouvrir/Decouvrir'
import Footer from '@/components/footer/Footer'
import NavbarOne from '@/components/headers/NavbarOne'
import Mobilemenu from '@/components/headers/Mobilemenu'
import type { Metadata } from 'next'
import ScrollToTopButton from '@/components/autres/ScrollToTopButton'

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
    <SidebarProviderCustom>
    <main>
      <div className="lg:hidden w-full block">
        <Mobilemenu />
      </div>
      <div className="w-full lg:sticky z-50 lg:top-0">
        <NavbarOne />
      </div>
      <div className="w-[95%] m-auto rounded sticky bg-primary-foreground mt-2 mb-2 px-4 lg:hidden block">
        <Decouvrir />
      </div>

      <div className="mt-0">
        {children}
      </div>
      <div className='w-full mt-8'>
        <Footer />
      </div>
      <ScrollToTopButton />
    </main>
    </SidebarProviderCustom>
  )
}