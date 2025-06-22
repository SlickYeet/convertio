import ButtonWithAnimatedArrow from "@/components/button-with-animated-arrow"

export default function CTA() {
  return (
    <section className="py-16">
      <div className="bg-primary flex flex-col items-center rounded-2xl p-8 text-center text-white md:p-12">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Ready to Convert Your Documents?
        </h2>
        <p className="text-primary-foreground mx-auto mb-8 max-w-2xl text-center text-xl opacity-90">
          Experience the easiest way to convert your documents. No sign-up, no
          hassle, just fast and reliable conversion.
        </p>

        <ButtonWithAnimatedArrow
          label="Start Converting Now"
          href="/markdown-to-pdf"
          variant="secondary"
        />
      </div>
    </section>
  )
}
