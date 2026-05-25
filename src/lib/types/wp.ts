export interface WPMediaDetails {
	width: number;
	height: number;
}

export interface WPFeaturedImage {
	node: {
		sourceUrl: string;
		srcSet?: string | null;
		sizes?: string | null;
		mediaDetails?: WPMediaDetails | null;
	};
}

export interface WPPost {
	title: string;
	slug: string;
	excerpt: string;
	content: string;
	date: string;
	featuredImage?: WPFeaturedImage | null;
}

export interface WPPage {
	title: string;
	slug: string;
	uri: string;
	content: string;
	date: string;
	featuredImage?: WPFeaturedImage | null;
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
