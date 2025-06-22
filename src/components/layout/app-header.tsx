"use client"

import { FileText, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NAVIGATION, type NavigationItem } from "@/const/navigation"
import { cn } from "@/lib/utils"

export function AppHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="flex h-16 items-center gap-x-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg">
            <FileText className="size-4" />
          </div>
          <span className="text-xl font-bold">HHN Converter</span>
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="hidden md:flex">
            {NAVIGATION.map((list) => (
              <NavigationMenuItem key={list.label}>
                <NavigationMenuTrigger>{list.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {list.items.map((item) => (
                      <ListItem key={item.label} {...item} />
                    ))}
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
          <SheetContent side="top" className="container pb-2 md:hidden">
            <SheetHeader className="px-0">
              <SheetTitle>HHN Converter</SheetTitle>
              <SheetDescription>
                Easily convert your documents.
              </SheetDescription>
            </SheetHeader>

            <NavigationMenu>
              <NavigationMenuList className="grid grid-cols-2 items-start gap-y-2">
                {NAVIGATION.map((list) => (
                  <NavigationMenuItem key={list.label}>
                    <h3 className="text-lg font-semibold">{list.label}</h3>
                    <ul className="space-y-2">
                      {list.items.map((item) => (
                        <ListItem key={item.label} {...item} />
                      ))}
                    </ul>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

function ListItem(props: NavigationItem) {
  const pathname = usePathname()

  const { label, href, description, icon: Icon, comingSoon } = props

  const isActive = pathname === href

  return (
    <li key={label} className="group/link relative">
      <NavigationMenuLink asChild>
        <Link
          href={comingSoon ? "" : href}
          className={cn(
            "hover:text-primary text-sm font-medium transition-colors",
            isActive && "text-primary",
          )}
        >
          <div className="flex items-center gap-x-2 text-sm leading-none font-medium">
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
      </NavigationMenuLink>
      {comingSoon && (
        <div className="bg-accent/50 absolute inset-0 flex items-center justify-center rounded-sm opacity-0 transition-opacity group-hover/link:opacity-100">
          <Badge variant="secondary">Coming Soon</Badge>
        </div>
      )}
    </li>
  )
}
