import { CTA } from "@/components/landing/cta"
import { Features } from "@/components/landing/features"
import { Hero } from "@/components/landing/hero"
import { Options } from "@/components/landing/options"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Options />
      <Features />
      <CTA />
    </>
  )
}
