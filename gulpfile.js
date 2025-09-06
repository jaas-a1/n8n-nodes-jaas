import gulp from 'gulp';
import path from 'path';
import { fileURLToPath } from 'url';

const { task, src, dest } = gulp;

// Recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

task('build:icons', copyIcons);

function copyIcons() {
	const nodeSource = path.resolve(__dirname, 'nodes', '**', '*.{png,svg}');
	const nodeDestination = path.resolve(__dirname, 'dist', 'nodes');

	src(nodeSource).pipe(dest(nodeDestination));

	const credSource = path.resolve(__dirname, 'credentials', '**', '*.{png,svg}');
	const credDestination = path.resolve(__dirname, 'dist', 'credentials');

	return src(credSource).pipe(dest(credDestination));
}
