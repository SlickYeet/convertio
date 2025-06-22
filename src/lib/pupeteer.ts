import chromium from "@sparticuz/chromium"
import puppeteer from "puppeteer-core"

export const browser = await puppeteer.launch({
  args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
  // @ts-expect-error - @sparticuz/chromium has no types
  defaultViewport: chromium.defaultViewport,
  executablePath: await chromium.executablePath(),
  // @ts-expect-error - @sparticuz/chromium has no types
  headless: chromium.headless,
})
