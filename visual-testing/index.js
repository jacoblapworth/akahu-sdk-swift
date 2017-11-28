const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const storyBookLocation = path.resolve(__dirname, '..', '.out');

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

const XUIPillStories = require('../src/react/components/pill/stories/variations.js').variations;
const XUIPillScenarios = XUIPillStories.map(story => {
	return {
		label: `XUI Pill ${story.storyTitle}`,
		url: buildUrl(story.storyKind, story.storyTitle),
		selectors: ['.xui-container']
	}
});

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
	scenarios: [
		...XUIPillScenarios,
		...XUIAutocompleterScenarios
	],
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
