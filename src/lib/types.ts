import { z } from "zod"

export const searchSchema = z.object({
	page: z.number().min(1).default(1).catch(1),
	filter: z.string().default("").catch(""),
	sort: z.enum(["asc", "desc"]).default("asc").catch("asc"),
})

export type SearchParams = z.infer<typeof searchSchema>
