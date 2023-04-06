import { getCollection } from "astro:content"
import { getContentfulPosts } from "./contentful"

export const getPosts = async () => {
	const markdownPosts = await getCollection("blog")
	const entries = await getContentfulPosts("blogPost")
	return [...markdownPosts, ...entries]
}

export const getPostBySlug = async (slug: string) => {
	
	return allPosts.find((post) => post && post.data.slug === slug)
}