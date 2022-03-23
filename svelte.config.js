import preprocess from 'svelte-preprocess';
import importAssets from 'svelte-preprocess-import-assets'
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess([importAssets()]),
	kit: {
		vite: {
			resolve: {
				alias: {
					$lib: resolve('./src/lib'),
					$components: resolve('./src/components'),
					$models: resolve('./src/models'),
					$util: resolve('./src/util')
				}
			}
		}
	}
};

export default config;
