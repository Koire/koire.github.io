import { defineConfig } from "astro/config"

// https://astro.build/config
import sanity from "astro-sanity"

// https://astro.build/config
export default defineConfig({
	site: "https://koire.github.io",
	integrations: [sanity({
        projectId: "mph9zukx",
        dataset: "production",
        apiVersion: "v2021-10-21",
        useCdn: true
    })]
})