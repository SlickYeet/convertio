import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Credits() {
  return (
    <div className="text-muted-foreground mt-8 flex items-center justify-center text-center text-sm md:mt-0">
      <p className="mr-1.5">Made with ❤️ by</p>
      <a
        href="https://lasse.famlam.ca"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sky-600 dark:text-sky-400"
      >
        <Avatar>
          <AvatarImage src="https://github.com/SlickYeet.png" />
          <AvatarFallback>Lasse</AvatarFallback>
        </Avatar>
      </a>
    </div>
  )
}
