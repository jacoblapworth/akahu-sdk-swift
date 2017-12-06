const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const storyBookLocation = path.resolve(__dirname, '..', '.out');
/**
 * Array of components that storybook should test.
 *
 * Example of full component to test implementation:
 * {
 * 	testsPrefix: 'XUI Pill',
 *	variationsPath: '../src/react/components/pill/stories/variations.js',
 *	variationsProp: 'myVariationsPropName', (defaults to 'variations')
 *	selectors: 'alternate > .selectors' (defaults to '.xui-container')
 * }
 */
const componentsToTest = [
	{
		testsPrefix: 'XUI Autocompleter',
		variationsPath: '../src/react/components/autocompleter/stories/variations.js'
	},
	{
		testsPrefix: 'XUI Avatar',
		variationsPath: '../src/react/components/avatar/stories/variations.js'
	},
	{
		testsPrefix: 'XUI Banner',
		variationsPath: '../src/react/components/banner/stories/variations.js'
	},
	{
		testsPrefix: 'XUI Button',
		variationsPath: '../src/react/components/button/stories/variations.js'
	},
	{
		testsPrefix: 'XUI Checkbox',
		variationsPath: '../src/react/components/checkbox/stories/variations.js'
	},
	{
		testsPrefix: 'XUI DatePicker',
		variationsPath: '../src/react/components/datepicker/stories/variations.js'
	},
	{
		testsPrefix: 'XUI Icon',
		variationsPath: '../src/react/components/icon/stories/variations.js'
	},
	{
		testsPrefix: 'XUI Modal',
		variationsPath: '../src/react/components/modal/stories/variations.js'
	},
	{
		testsPrefix: 'XUI Pill',
		variationsPath: '../src/react/components/pill/stories/variations.js'
	},
	{
		testsPrefix: 'XUI Radio',
		variationsPath: '../src/react/components/radio/stories/variations.js'
	},
	{
		testsPrefix: 'XUI Switch',
		variationsPath: '../src/react/components/switch/stories/variations.js'
	},
	{
		testsPrefix: 'XUI Tag',
		variationsPath: '../src/react/components/tag/stories/variations.js'
	},
	{
		testsPrefix: 'XUI Toast',
		variationsPath: '../src/react/components/toast/stories/variations.js'
	},
	{
		testsPrefix: 'XUI Toggle',
		variationsPath: '../src/react/components/toggle/stories/variations.js'
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
	asyncCaptureLimit: 2,
	asyncCompareLimit: 50,
	debug: false,
	debugWindow: false
}
