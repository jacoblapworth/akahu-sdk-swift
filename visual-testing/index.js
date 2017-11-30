const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const storyBookLocation = path.resolve(__dirname, '..', '.out');

const componentsToTest = [
	{
		testsPrefix: 'XUI Pill',
		variationsPath: '../src/react/components/pill/stories/variations.js'
		// variationsProp: 'myVariationsPropName', // defaults to 'variations'
		// selectors: 'alternate > .selectors' // defaults to '.xui-container'
	},
	{
		testsPrefix: 'XUI Autocompleter',
		variationsPath: '../src/react/components/autocompleter/stories/variations.js'
	},
	{
		testsPrefix: 'XUI Button',
		variationsPath: '../src/react/components/button/stories/variations.js'
	}
];

execSync('npm run storybook:pr', (err, stdout, stderr) => {
	if (err) { console.error(`Exec error: ${err}`); } //eslint-disable-line no-console
	console.log(`stdout: ${stdout}`); //eslint-disable-line no-console
	console.log(`stderr: ${stderr}`); //eslint-disable-line no-console
});

function buildUrl(kind, story) {
	const testingDomain = path.resolve(storyBookLocation, 'iframe.html?').replace(/\/.out/gi, "%SPLIT%/.out").split('%SPLIT%')[1];
	const urlSearch = `selectedKind=${kind}&selectedStory=${story}`;
	return `${testingDomain}${urlSearch}`;
}

function buildScenarios() {
	let scenarios = [];
	componentsToTest.forEach(component => {
		const variationsFile = require(component.variationsPath);
		const variations = variationsFile && variationsFile[component.variationsProp || 'variations'];
		scenarios = scenarios.concat(
			variations.map(story => {
				return {
					label: `${component.testsPrefix} ${story.storyTitle}`,
					url: buildUrl(story.storyKind, story.storyTitle),
					selectors: [component.selectors || '.xui-container']
				};
			})
		);
	});
	return scenarios;
};

const XUIAutocompleterStories = require('../src/react/components/autocompleter/stories/variations.js').variations;
const XUIAutocompleterScenarios = XUIAutocompleterStories.map(story => {
	return {
		label: `XUI Autocompleter ${story.storyTitle}`,
		url: buildUrl(story.storyKind, story.storyTitle),
		selectors: ['.xui-container']
	}
});

module.exports = {
	id: "backstop_default",
	viewports: [
		{
			label: "just desktop",
			width: 1920,
			height: 1080
		}
	],
	scenarios: buildScenarios(),
	paths: {
		bitmaps_reference: "visual-testing/reference",
		bitmaps_test: "visual-testing/tests",
		html_report: "visual-testing/web-report",
		ci_report: "visual-testing/ci-report"
	},
	report: ["browser", "CI"],
	engine: "chrome",
	engineFlags: [],
	asyncCaptureLimit: 5,
	asyncCompareLimit: 50,
	debug: false,
	debugWindow: false
}
