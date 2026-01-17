import type { ReactNode } from 'react'
import Container from './Container'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollButtons from './ScrollButtons'
import AmbientSparks from './AmbientSparks'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 flex flex-col transition-colors duration-200 overflow-x-hidden relative">
      <AmbientSparks count={30} speed={0.3} size={{ min: 1, max: 3 }} />
      <Navbar />
      <main className="w-full flex-grow overflow-x-hidden relative z-10">
        {children}
      </main>
      <Footer />
      <ScrollButtons />
    </div>
  )
}

export { Container }

