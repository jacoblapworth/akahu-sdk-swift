const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const storyBookLocation = path.resolve(__dirname, '..', 'docs', 'storybook');
const testingDomain = path.resolve(storyBookLocation, 'iframe.html?');

// For components or compositions with absolutely-positioned elements, use fullPageSettings.
const fullPageSettings = {
	selectors: '.xui-container',
	misMatchThreshold: .4
};

/**
 * Array of components that storybook should test.
 *
 * Example of full component to test implementation:
 * {
 * 	testsPrefix: 'XUI Pill',
 *	variationsPath: '../src/react/components/pill/stories/variations.js',
 *	variationsProp: 'myVariationsPropName', (defaults to 'variations')
 *	selectors: 'alternate > .selectors' (defaults to '#root > div > div')
 *	misMatchThreshold: 5 (percentage variance to allow. defaults to .6 or .4 for full-page capture)
 *	delay: adds a delay between onReady and capture
 * }
 */
const componentsToTest = [
	{
		testsPrefix: 'XUI Autocompleter',
		variationsPath: '../src/react/components/autocompleter/stories/variations.js',
		...fullPageSettings
	},
	{
		testsPrefix: 'XUI Avatar',
		variationsPath: '../src/react/components/avatar/stories/variations.js',
		delay: 500
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
		testsPrefix: 'XUI Capsule',
		variationsPath: '../src/react/components/capsule/stories/variations.js'
	},
	{
		testsPrefix: 'XUI Checkbox',
		variationsPath: '../src/react/components/checkbox/stories/variations.js',
		delay: 500
	},
	{
		testsPrefix: 'XUI DatePicker',
		variationsPath: '../src/react/components/datepicker/stories/variations.js'
	},
	{
		testsPrefix: 'DropDown',
		variationsPath: '../src/react/components/dropdown/stories/variations.js',
		...fullPageSettings
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
		variationsPath: '../src/react/components/loader/stories/variations.js',
		misMatchThreshold: 5
	},
	{
		testsPrefix: 'XUI Modal',
		variationsPath: '../src/react/components/modal/stories/variations.js',
		...fullPageSettings
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
		variationsPath:
			'../src/react/components/progressindicator/stories/variations.js',
			delay: 500
	},
	{
		testsPrefix: 'XUI Radio',
		variationsPath: '../src/react/components/radio/stories/variations.js',
		delay: 500
	},
	{
		testsPrefix: 'Rollover Checkbox',
		variationsPath:
			'../src/react/components/rolloverCheckbox/stories/variations.js'
	},
	{
		testsPrefix: 'SelectBox',
		variationsPath: '../src/react/components/select-box/stories/variations.js',
		...fullPageSettings
	},
	{
		testsPrefix: 'XUI Switch',
		variationsPath: '../src/react/components/switch/stories/variations.js'
	},
	{
		testsPrefix: 'XUI Stepper',
		variationsPath: '../src/react/components/stepper/stories/variations.js',
		delay: 500
	},
	{
		testsPrefix: 'XUI Tag',
		variationsPath: '../src/react/components/tag/stories/variations.js'
	},
	{
		testsPrefix: 'XUI Textarea',
		variationsPath: '../src/react/components/textarea/stories/variations.js',
		delay: 1500
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
		testsPrefix: 'XUI Tooltip',
		variationsPath: '../src/react/components/tooltip/stories/variations.js',
		selectors: '#root > div > div > div',
		delay: 1000
	},
	{
		testsPrefix: 'Compositions',
		variationsPath: '../src/react/stories/tests.js',
		delay: 1500,
		...fullPageSettings
	},
	{
		testsPrefix: 'Page Layouts',
		variationsPath: '../src/react/page-layouts/tests.js',
		...fullPageSettings
	}
];

execSync('npm run storybook:pr', (err, stdout, stderr) => {
	if (err) {
		console.error(`Exec error: ${err}`);
	} //eslint-disable-line no-console
	console.log(`stdout: ${stdout}`); //eslint-disable-line no-console
	console.log(`stderr: ${stderr}`); //eslint-disable-line no-console
});

function buildUrl(kind, story) {
	const urlSearch = `selectedKind=${kind}&selectedStory=${story}`;
	return `file://${testingDomain}${urlSearch}`;
}

function buildScenarios() {
	let scenarios = [];
	componentsToTest.forEach(component => {
		const {delay, hoverSelector, postInteractionWait} = component;
		const variationsFile = require(component.variationsPath);
		const variations =
			variationsFile &&
			variationsFile[component.variationsProp || 'variations'];
		scenarios = scenarios.concat(
			variations.map(story => {
				return {
					label: `${component.testsPrefix} ${story.storyTitle}`,
					url: buildUrl(story.storyKind, story.storyTitle),
					selectors: [component.selectors || '#root > div > div'],
					misMatchThreshold: component.misMatchThreshold || 0.6,
					selectorExpansion: component.captureAllSelectors,
					delay
				};
			})
		);
	});
	return scenarios;
}

const scenarios = buildScenarios();

module.exports = {
	id: 'backstop_default',
	viewports: [
		{
			label: 'just desktop',
			width: 1024,
			height: 768
		}
	],
	scenarios,
	paths: {
		bitmaps_reference: 'visual-testing/reference',
		bitmaps_test: 'visual-testing/tests',
		html_report: 'visual-testing/web-report',
		ci_report: 'visual-testing/ci-report'
	},
	report: ['browser', 'CI'],
	engine: 'chrome',
	engineFlags: [],
	asyncCaptureLimit: 2,
	asyncCompareLimit: 50,
	debug: false,
	debugWindow: false
};
