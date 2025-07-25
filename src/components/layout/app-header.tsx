"use client"

import { FileText, Menu, X } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

import { Logo } from "@/components/logo"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CONFIG, CONFIG_LIST, type ConfigItem } from "@/constants/conversion"
import { cn } from "@/lib/utils"

export function AppHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur">
      <div className="flex h-16 items-center gap-x-4">
        <Logo />

        <NavigationMenu>
          <NavigationMenuList className="hidden md:flex">
            {CONFIG_LIST.map((list) => (
              <NavigationMenuItem key={list.label}>
                <NavigationMenuTrigger className="capitalize">
                  {list.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {list.items.map((item) => {
                      const category =
                        list.label.toLowerCase() as keyof typeof CONFIG

                      return (
                        <ListItem
                          onClick={() => setIsMobileMenuOpen(false)}
                          key={item.label}
                          category={category}
                          {...item}
                        />
                      )
                    })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger className="md:hidden" asChild>
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              size="icon"
              variant="ghost"
              className="ml-auto md:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            side="top"
            showDefaultCloseButton={false}
            className="supports-[backdrop-filter]:bg-background/60 bg-background/90 container min-h-screen px-2.5 pb-2 backdrop-blur md:hidden md:px-4"
          >
            <SheetHeader className="px-0">
              <SheetTitle onClick={() => setIsMobileMenuOpen(false)}>
                <Logo />
              </SheetTitle>
              <SheetDescription>
                Easily convert your documents.
              </SheetDescription>
            </SheetHeader>

            <Accordion type="single" collapsible className="w-full">
              {CONFIG_LIST.map((list) => (
                <AccordionItem key={list.label} value={list.label}>
                  <AccordionTrigger className="capitalize">
                    {list.label}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      {list.items.map((item) => {
                        const category =
                          list.label.toLowerCase() as keyof typeof CONFIG

                        return (
                          <ListItem
                            onClick={() => setIsMobileMenuOpen(false)}
                            key={item.label}
                            category={category}
                            {...item}
                          />
                        )
                      })}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <SheetClose asChild>
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-4 right-2"
              >
                <X className="size-5" />
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

interface ListItemProps extends ConfigItem {
  category: keyof typeof CONFIG
  onClick?: () => void
}

function ListItem(props: ListItemProps) {
  const searchParams = useSearchParams()
  const type = searchParams.get("type")

  const {
    label,
    href,
    description,
    icon: Icon,
    comingSoon,
    category,
    onClick,
  } = props

  const isActive = type === href

  return (
    <li key={label} className="group relative">
      <Link
        onClick={comingSoon ? undefined : onClick}
        href={comingSoon ? "" : `/${category}?type=${href}`}
        className={cn(
          "hover:text-primary focus:text-primary hover:bg-accent focus:bg-accent flex flex-col gap-1 rounded-sm p-2 transition-all outline-none",
          isActive && "text-primary",
          comingSoon &&
            "hover:bg-transparent hover:text-inherit focus:bg-transparent focus:text-inherit",
        )}
      >
        <div className="flex items-center gap-x-2 text-sm leading-none font-medium capitalize">
          {Icon ? (
            <Icon className="size-4 text-inherit" />
          ) : (
            <FileText className="size-4 text-inherit" />
          )}
          {label}
        </div>
        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
          {description}
        </p>
      </Link>
      {comingSoon && (
        <div className="bg-accent/50 absolute inset-0 flex items-center justify-center rounded-sm opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 group-active:opacity-100">
          <Badge variant="secondary">Coming Soon</Badge>
        </div>
      )}
    </li>
  )
}
