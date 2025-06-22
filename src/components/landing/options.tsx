import { ArrowRight, FileText } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { NAVIGATION } from "@/const/navigation"
import { cn } from "@/lib/utils"

export default function Options() {
  return (
    <section className="container py-16">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Choose Your Conversion Tool
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          Select from our range of conversion tools, each optimized for specific
          document types and use cases.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {NAVIGATION.map((list) => (
          <div key={list.label} className="space-y-4">
            <h3 className="mb-4 text-xl font-semibold">{list.label}</h3>
            {list.items.map((item) => {
              const {
                label,
                href,
                description,
                icon: Icon,
                popular,
                comingSoon,
              } = item

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

                  <CardHeader className="pb-4">
                    <div className="mb-2 flex items-center gap-3">
                      <div className="bg-primary/10 text-primary rounded-lg p-2">
                        {Icon ? (
                          <Icon className="size-6" />
                        ) : (
                          <FileText className="size-6" />
                        )}
                      </div>
                      <CardTitle className="text-xl">{label}</CardTitle>
                    </div>
                    <CardDescription className="text-base leading-relaxed">
                      {description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <Button
                      disabled={comingSoon}
                      variant={comingSoon ? "secondary" : "default"}
                      className={cn(
                        "w-full",
                        comingSoon &&
                          "pointer-events-none cursor-default opacity-50",
                      )}
                      asChild
                    >
                      {comingSoon ? (
                        <span>Coming Soon</span>
                      ) : (
                        <Link href={href} className="group/link">
                          <span className="mr-[-23px] transition-all group-hover/link:mr-0">
                            Start Converting
                          </span>
                          <ArrowRight className="size-4 scale-0 transition-transform group-hover/link:scale-100" />
                        </Link>
                      )}
                    </Button>
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
