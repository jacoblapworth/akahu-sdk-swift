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
 *	selectors: 'alternate > .selectors' (defaults to '#root > div > div')
 *      NB: override the default for absolutely positioned components.
 *	misMatchThreshold: 5 (percentage variance to allow. defaults to .4)
 * }
 */
const componentsToTest = [
	{
		testsPrefix: 'XUI Autocompleter',
		variationsPath: '../src/react/components/autocompleter/stories/variations.js',
		selectors: '.xui-container'
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
		testsPrefix: 'DropDown',
		variationsPath: '../src/react/components/dropdown/stories/variations.js',
		selectors: '.xui-container'
	},
	{
		testsPrefix: 'XUI Icon',
		variationsPath: '../src/react/components/icon/stories/variations.js',
		selectors: '.capture'
	},
	{
		testsPrefix: 'XUI Input',
		variationsPath: '../src/react/components/input/stories/variations.js'
	},
	{
		testsPrefix: 'XUI Loader',
		variationsPath: '../src/react/components/loader/stories/variations.js'
	},
	{
		testsPrefix: 'XUI Modal',
		variationsPath: '../src/react/components/modal/stories/variations.js',
		selectors: '.xui-container'
	},
	{
		testsPrefix: 'XUI Picklist',
		variationsPath: '../src/react/components/picklist/stories/variations.js'
	},
	{
		testsPrefix: 'XUI Pill',
		variationsPath: '../src/react/components/pill/stories/variations.js'
	},
	{
		testsPrefix: 'XUI Progress Indicator',
		variationsPath: '../src/react/components/progressindicator/stories/variations.js'
	},
	{
		testsPrefix: 'XUI Radio',
		variationsPath: '../src/react/components/radio/stories/variations.js'
	},
	{
		testsPrefix: 'Rollover Checkbox',
		variationsPath: '../src/react/components/rolloverCheckbox/stories/variations.js'
	},
	{
		testsPrefix: 'SelectBox',
		variationsPath: '../src/react/components/select-box/stories/variations.js',
		selectors: '.xui-container'
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
		testsPrefix: 'XUI Textarea',
		variationsPath: '../src/react/components/textarea/stories/variations.js'
	},
	{
		testsPrefix: 'XUI Toast',
		variationsPath: '../src/react/components/toast/stories/variations.js'
	},
	{
		testsPrefix: 'XUI Toggle',
		variationsPath: '../src/react/components/toggle/stories/variations.js'
	},
	{
		testsPrefix: 'Compositions',
		variationsPath: '../src/react/stories/tests.js',
		selectors: '.xui-container'
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
					selectors: [component.selectors || '#root > div > div'],
					misMatchThreshold: component.misMatchThreshold || .4,
					selectorExpansion: component.captureAllSelectors
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
			width: 1024,
			height: 768
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
