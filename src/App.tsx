import './styles/global.css'

import Header from './components/Header'
import HeroSection from './sections/HeroSection'
import ServicesSection from './sections/ServiceSection'
import ProjectSection from './sections/ProjectSection'
import ExperienceSection from './sections/ExperienceSection'
import TestimonialSection from './sections/TestimonialSection'
import ContactSection from './sections/ContactSection'
import Footer from './components/Footer'

function App() {

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection/>
        <ExperienceSection/>
        <ProjectSection/>
        <TestimonialSection/>
        <ContactSection/>
      </main>
      <Footer/>
    </div>
  )
}

export default App
