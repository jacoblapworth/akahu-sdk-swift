#!/usr/bin/env node
const path = require('path');
const { generateSW } = require('workbox-build');
const { rootDirectory, taskRunner } = require('../helpers');
const globDirectory = path.resolve(rootDirectory, 'dist', 'docs');
const swDest = path.resolve(rootDirectory, 'dist', 'docs', 'sw.js');

module.exports = () => taskRunner(taskSpinner => {

	taskSpinner.info('Generating service worker');

	return generateSW({
		globDirectory,
		globPatterns: ['**/*.{html,json,js,css}'],
		swDest,
		runtimeCaching: [
			{
				urlPattern: new RegExp('.(png|jpg|jpeg|svg)$'),
				handler: 'cacheFirst',
			},
			{
				urlPattern: new RegExp('^https://(edge.xero.com|cdnjs.cloudflare.com|cdn.polyfill.io|cdn.rawgit.com)/'),
				handler: 'networkFirst',
			}
		],
	});

}, __filename);
require('make-runnable/custom')({
	printOutputFrame: false
});
