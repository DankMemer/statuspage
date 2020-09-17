import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import preprocess from 'svelte-preprocess';
import replace from '@rollup/plugin-replace';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;
	
	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			dev: !production,
			css: css => {
				css.write('public/build/bundle.css');
			},

			preprocess: preprocess()
		}),

		resolve({
			browser: true,
			dedupe: ['svelte']
		}),

		commonjs(),

		!production && serve(),

		!production && livereload('public'),

		production && terser(),

		replace({
			env: JSON.stringify({
				APP_API_URL: process.env.APP_API_URL || 'https://dankmemer.gg',
				APP_WS_URL: process.env.APP_WS_URL || 'wss://dankmemer.gg',
			}),
		}),
	],
	watch: {
		clearScreen: true,
	},
};
