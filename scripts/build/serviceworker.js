#!/usr/bin/env node
const path = require('path');
const { version: cacheId } = require('../../package.json');
const { generateSW } = require('workbox-build');
const { rootDirectory, taskRunner } = require('../helpers');
const globDirectory = path.resolve(rootDirectory, 'dist', 'docs');
const swDest = path.resolve(rootDirectory, 'dist', 'docs', 'sw.js');

module.exports = () => taskRunner(taskSpinner => {

	taskSpinner.info(`Generating service worker against ID ${cacheId}`);

	return generateSW({
		cacheId,
		swDest,
		globDirectory,
		globPatterns: ['**/*.{html,json,js,css}'],
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
