
import { createImageBuilder, useSanityClient } from "astro-sanity"

const builder = createImageBuilder(useSanityClient())

export function getSanityImageURL(source: string) {
	return builder.image(source)
}
export type SanityPost = {
	title: string,
	slug: string,
	author: string,
	published_at: string,
	body: string,
	categories?: string[]
}

export async function getAllPosts() : Promise<SanityPost[]> {
	const query = "*[_type == 'post']{\"categoryData\": categories[]->{slug, title},author -> {name}, ...} | order(publishedAt desc)"
	const data = await useSanityClient().fetch(query)
	return data
}

export async function getAllCategoriesWithPosts() {
	const query = "*[_type == 'category']{\"posts\": *[_type == \"post\" && references(^._id)] | order(publishedAt desc), ...}"
	const data = await useSanityClient().fetch(query)
	return data
}