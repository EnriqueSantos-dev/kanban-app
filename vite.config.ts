import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svgr({
			exportAsDefault: true
		}),
		react()
	],
	resolve: {
		alias: {
			'~': path.resolve(__dirname, 'src')
		}
	}
});
