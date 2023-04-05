import { defineCollection, z } from "astro:content"

const blogCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		tags: z.array(z.string()),
		image: z.string().optional(),
		slug: z.string()
	})
})

const recipeCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		tags: z.array(z.string()),
		slug: z.string(),
		rating: z.number(),
		description: z.string()
	})
})

export const collection = {
	"recipes": recipeCollection,
	"blog": blogCollection,
}