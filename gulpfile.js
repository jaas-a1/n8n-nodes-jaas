const gulp = require('gulp');
const path = require('path');

const { task, src, dest } = gulp;

// Recreate __dirname in CommonJS

task('build:icons', copyIcons);

function copyIcons() {
	const nodeSource = path.resolve(__dirname, 'nodes', '**', '*.{png,svg}');
	const nodeDestination = path.resolve(__dirname, 'dist', 'nodes');

	src(nodeSource).pipe(dest(nodeDestination));

	const credSource = path.resolve(__dirname, 'credentials', '**', '*.{png,svg}');
	const credDestination = path.resolve(__dirname, 'dist', 'credentials');

	return src(credSource).pipe(dest(credDestination));
}
