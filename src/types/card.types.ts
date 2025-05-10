export interface ToolCardProps {
	id: string;
	title: string;
	description: string;
	coverImage: string;
	path: string;
	version: string;
	category: string;
}

export interface BlogCardProps {
	id: string;
	title: string;
	excerpt: string;
	coverImage: string;
	date: string;
	slug: string;
	author?: string;
	tags?: string[];
	category?: string;
	featured?: boolean;
}
