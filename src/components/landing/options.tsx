import ButtonWithAnimatedArrow from "@/components/button-with-animated-arrow"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CONFIG, CONFIG_LIST } from "@/constants/conversion"
import { cn } from "@/lib/utils"

export function Options() {
  return (
    <section className="py-16">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Choose Your Conversion Tool
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg text-balance">
          Select from our range of converters, tools and utilities, each
          optimized for specific document types and use cases.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CONFIG_LIST.map((list) => (
          <div key={list.label} className="space-y-4">
            <h3 className="mb-4 text-xl font-semibold capitalize">
              {list.label}
            </h3>
            {list.items.map((item) => {
              const {
                label,
                href: hrefFromProps,
                description,
                icon: Icon,
                popular,
                comingSoon,
                isNew,
              } = item

              const category = list.label.toLowerCase() as keyof typeof CONFIG
              const href = `/${category}?type=${hrefFromProps}`

              const buttonLabel = (() => {
                switch (category) {
                  case "converters":
                    return "Start Converting"
                  case "tools":
                    return "Use Tool"
                  case "utilities":
                    return "Use Utility"
                  default:
                    return "Start Now"
                }
              })()

              return (
                <Card
                  key={label}
                  className="group hover:border-primary/20 relative border-2 transition-all duration-300 hover:shadow-lg"
                >
                  {popular && (
                    <Badge className="absolute -top-2 left-4">
                      Most Popular
                    </Badge>
                  )}
                  {comingSoon && (
                    <Badge
                      variant="secondary"
                      className="absolute -top-2 left-4"
                    >
                      Coming Soon
                    </Badge>
                  )}
                  {isNew && (
                    <Badge className="absolute -top-2 left-4 bg-sky-500/25 text-sky-600 dark:text-sky-400">
                      New
                    </Badge>
                  )}

                  <CardHeader className="pb-4">
                    <div className="mb-2 flex items-center gap-3">
                      <div className="bg-primary/10 text-primary rounded-lg p-2">
                        <Icon className="size-6" />
                      </div>
                      <CardTitle className="text-xl capitalize">
                        {label}
                      </CardTitle>
                    </div>
                    <CardDescription className="line-clamp-2 text-base leading-relaxed">
                      {description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <ButtonWithAnimatedArrow
                      disabled={comingSoon}
                      label={buttonLabel}
                      href={href}
                      comingSoon={comingSoon}
                      size="default"
                      variant={comingSoon ? "secondary" : "default"}
                      className={cn(
                        "w-full text-sm",
                        comingSoon &&
                          "pointer-events-none cursor-default opacity-50",
                      )}
                    />
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}
