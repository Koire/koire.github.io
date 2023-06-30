import { defineConfig } from "astro/config"
import remarkCopyLinkedFiles from "remark-copy-linked-files"
import {join, dirname} from "path"
import { fileURLToPath } from "url"
const __dirname = dirname(fileURLToPath(import.meta.url))

console.log(__dirname)
const pathName = "images"
const imageDestination = join(__dirname, "src", "images")
// https://astro.build/config
import sanity from "astro-sanity"

// https://astro.build/config
import image from "@astrojs/image"

// https://astro.build/config
import tailwind from "@astrojs/tailwind"

// https://astro.build/config
export default defineConfig({
	site: "https://koire.github.io",
	integrations: [sanity({
		projectId: "mph9zukx",
		dataset: "production",
		apiVersion: "v2021-10-21",
		useCdn: true
	}), image(), tailwind()],
	markdown: {
		remarkPlugins: [
			[remarkCopyLinkedFiles, {
				imageDestination,
				staticPath: `/${pathName}`
			}]
		]
	}
})