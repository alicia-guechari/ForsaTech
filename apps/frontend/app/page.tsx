'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { OpportunitiesSection } from '@/components/sections/OpportunitiesSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { StatsSection } from '@/components/sections/StatsSection'

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <OpportunitiesSection />
      <AboutSection />
      <FAQSection />
      <Footer />
    </main>
  )
}
