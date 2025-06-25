import ButtonWithAnimatedArrow from "@/components/button-with-animated-arrow"
import { siteConfig } from "@/config"

export default function CTA() {
  return (
    <section className="py-16">
      <div className="bg-primary flex flex-col items-center rounded-2xl p-8 text-center text-white md:p-12">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          We are open source and free to use!
        </h2>
        <p className="text-primary-foreground mx-auto mb-8 max-w-2xl text-center text-xl opacity-90">
          Convertio is an open-source project, help us by staring it on GitHub
          and contributing to its development. Your support means a lot to us!
        </p>

        <ButtonWithAnimatedArrow
          label="Star on GitHub"
          href={siteConfig.githubUrl}
          variant="secondary"
        />
      </div>
    </section>
  )
}
