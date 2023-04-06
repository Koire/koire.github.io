import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import type { Document } from "@contentful/rich-text-types";
import contentful from "contentful";
export interface BlogPost {
    title: string;
    date: string;
    description: string;
    content: Document;
    slug: string;
}

const convertFieldsToData = (item: BlogPost) => ({
	...item,
	body:  documentToHtmlString(item.fields.content),
	slug: item.fields.slug,
	data: {
		...item.fields,
		pubDate: new Date(item.sys.updatedAt).toLocaleDateString()
	},
})

export const contentfulClient = contentful.createClient({
	space: import.meta.env.CONTENTFUL_SPACE_ID,
	accessToken: import.meta.env.DEV
		? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
		: import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
	host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
})

export const getContentfulPosts = async (contentType: string) => {
	return await contentfulClient.getEntries<BlogPost>({
		content_type: contentType
	}).then(({items}) => items.filter(item => item.fields.slug).map(convertFieldsToData))
}

export const getContentfulBySlug = async (contentType:string, slug: string) => {
	return await contentfulClient.getEntries({
		content_type: contentType,
		"fields.slug[in]": slug
	})
}
