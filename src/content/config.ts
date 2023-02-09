import { z, defineCollection } from "astro:content"

const blogCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		tags: z.array(z.string()),
		image: z.string().optional(),
		slug: z.string()
	})
})

export const collection = {
	"blog": blogCollection
}