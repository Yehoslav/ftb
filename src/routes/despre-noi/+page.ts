import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		seo: { title: 'Despre noi', description: 'Povestea Federației Tinerilor Basarabeni — de la începuturi în 2017 până la înființarea legală în 2021.' }
	};
};
