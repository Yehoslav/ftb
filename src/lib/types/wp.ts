export interface WPPost {
	title: string;
	slug: string;
	excerpt: string;
	content: string;
	date: string;
	featuredImage?: {
		node: {
			sourceUrl: string;
		};
	};
}

export interface WPPage {
	title: string;
	slug: string;
	uri: string;
	content: string;
	date: string;
	featuredImage?: {
		node: {
			sourceUrl: string;
		};
	};
}

export interface PostsQueryResult {
	posts: {
		nodes: WPPost[];
		pageInfo?: {
			hasNextPage: boolean;
			endCursor: string | null;
		};
	};
}

export interface PostQueryResult {
	post: WPPost;
}
