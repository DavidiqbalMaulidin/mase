'use client'

import { useState } from 'react'
import Hero from '@/components/landing/hero'
import ProblemStatement from '@/components/landing/problem-statement'
import SolutionIntro from '@/components/landing/solution-intro'
import Features from '@/components/landing/features'
import HowItWorks from '@/components/landing/how-it-works'
import DemoPreview from '@/components/landing/demo-preview'
import AnalyticsShowcase from '@/components/landing/analytics-showcase'
import WhyMase from '@/components/landing/why-mase'
import Testimonials from '@/components/landing/testimonials'
import ClosingCTA from '@/components/landing/closing-cta'
import Navigation from '@/components/landing/navigation'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-blue-50 dark:from-background dark:via-background dark:to-slate-950">
      <Navigation />
      <Hero />
      <ProblemStatement />
      <SolutionIntro />
      <Features />
      <HowItWorks />
      <DemoPreview />
      <AnalyticsShowcase />
      <WhyMase />
      <Testimonials />
      <ClosingCTA />
    </div>
  )
}
