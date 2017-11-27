#!/bin/sh
npm run lint
npm run test:coverage
./node_modules/.bin/npm-run-all storybook:pr test:visual
