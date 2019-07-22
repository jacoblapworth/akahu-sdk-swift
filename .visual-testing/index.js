const { execSync } = require('child_process');
const path = require('path');
const { standardDesktopViewport } = require('../src/react/stories/helpers/viewports');

const storyBookLocation = path.resolve(__dirname, '..', 'dist', 'docs', 'storybook');
const testingDomain = path.resolve(storyBookLocation, 'iframe.html?');
const variationsPath = '../.tmp/react-visualregression/components';

// For components or compositions with absolutely-positioned elements, use fullPageSettings.
const fullPageSettings = {
  selectors: '.xui-container',
  misMatchThreshold: 0.4,
};

/**
 * Array of components that storybook should test.
 *
 * Example of full component to test implementation:
 * {
 * 	testsPrefix: 'XUI Pill',
 *	variationsPath: `${variationsPath}/pill/stories/variations.js`,
 *	variationsProp: 'myVariationsPropName', (defaults to 'variations')
 *	selectors: 'alternate > .selectors' (defaults to '#root > div > div')
 *	misMatchThreshold: 5 (percentage variance to allow. defaults to .6 or .4 for full-page capture)
 *	delay: adds a delay between onReady and capture
 * }
 */
const componentsToTest = [
  {
    testsPrefix: 'XUI Accordion',
    variationsPath: `${variationsPath}/accordion/stories/variations.js`,
  },
  {
    testsPrefix: 'XUI Autocompleter',
    variationsPath: `${variationsPath}/autocompleter/stories/variations.js`,
    ...fullPageSettings,
  },
  {
    testsPrefix: 'XUI Avatar',
    variationsPath: `${variationsPath}/avatar/stories/variations.js`,
    delay: 500,
  },
  {
    testsPrefix: 'XUI Banner',
    variationsPath: `${variationsPath}/banner/stories/variations.js`,
  },
  {
    testsPrefix: 'XUI Bar Chart',
    variationsPath: `${variationsPath}/chart/stories/variations.js`,
    readyEvent: 'xui-bar-chart-ready-event',
  },
  {
    testsPrefix: 'XUI Button',
    variationsPath: `${variationsPath}/button/stories/variations.js`,
  },
  {
    testsPrefix: 'XUI Capsule',
    variationsPath: `${variationsPath}/capsule/stories/variations.js`,
  },
  {
    testsPrefix: 'XUI Checkbox',
    variationsPath: `${variationsPath}/checkbox/stories/variations.js`,
    delay: 500,
  },
  {
    testsPrefix: 'XUI DatePicker',
    variationsPath: `${variationsPath}/datepicker/stories/variations.js`,
  },
  {
    testsPrefix: 'DropDown',
    variationsPath: `${variationsPath}/dropdown/stories/variations.js`,
    ...fullPageSettings,
  },
  {
    testsPrefix: 'XUI Icon',
    variationsPath: `${variationsPath}/icon/stories/variations.js`,
    selectors: '.capture',
  },
  {
    testsPrefix: 'XUI Illustration',
    variationsPath: `${variationsPath}/illustration/stories/variations.js`,
  },
  {
    testsPrefix: 'XUI Loader',
    variationsPath: `${variationsPath}/loader/stories/variations.js`,
    misMatchThreshold: 5,
  },
  {
    testsPrefix: 'XUI Modal',
    variationsPath: `${variationsPath}/modal/stories/variations.js`,
    ...fullPageSettings,
  },
  {
    testsPrefix: 'XUI Picklist',
    variationsPath: `${variationsPath}/picklist/stories/variations.js`,
  },
  {
    testsPrefix: 'XUI Pill',
    variationsPath: `${variationsPath}/pill/stories/variations.js`,
  },
  {
    testsPrefix: 'XUI Isolation Header',
    variationsPath: `${variationsPath}/isolationheader/stories/variations.js`,
  },
  {
    testsPrefix: 'XUI Progress Indicator',
    variationsPath: `${variationsPath}/progressindicator/stories/variations.js`,
    readyEvent: 'xui-progress-ready-event',
  },
  {
    testsPrefix: 'XUI Radio',
    variationsPath: `${variationsPath}/radio/stories/variations.js`,
    delay: 500,
  },
  {
    testsPrefix: 'XUI Range',
    variationsPath: `${variationsPath}/range/stories/variations.js`,
    delay: 500,
  },
  {
    testsPrefix: 'Rollover Checkbox',
    variationsPath: `${variationsPath}/rolloverCheckbox/stories/variations.js`,
  },
  {
    testsPrefix: 'SelectBox',
    variationsPath: `${variationsPath}/select-box/stories/variations.js`,
    ...fullPageSettings,
  },
  {
    testsPrefix: 'XUI Switch',
    variationsPath: `${variationsPath}/switch/stories/variations.js`,
  },
  {
    testsPrefix: 'XUI Stepper',
    variationsPath: `${variationsPath}/stepper/stories/variations.js`,
    delay: 500,
  },
  {
    testsPrefix: 'XUI Table',
    variationsPath: `${variationsPath}/table/stories/variations.js`,
    readyEvent: 'xui-table-ready-event',
  },
  {
    testsPrefix: 'XUI Tag',
    variationsPath: `${variationsPath}/tag/stories/variations.js`,
  },
  {
    testsPrefix: 'XUI TextInput',
    variationsPath: `${variationsPath}/textinput/stories/variations.js`,
    delay: 1500,
  },
  {
    testsPrefix: 'XUI Toast',
    variationsPath: `${variationsPath}/toast/stories/variations.js`,
  },
  {
    testsPrefix: 'XUI Toggle',
    variationsPath: `${variationsPath}/toggle/stories/variations.js`,
  },
  {
    testsPrefix: 'XUI Tooltip',
    variationsPath: `${variationsPath}/tooltip/stories/variations.js`,
    selectors: '#root > div > div > div',
    delay: 1000,
  },
  {
    testsPrefix: 'Structural',
    variationsPath: `${variationsPath}/structural/stories/variations.js`,
  },
  {
    testsPrefix: 'Components in Components',
    variationsPath: '../.tmp/react-visualregression/stories/components-in-components/tests.js',
    delay: 1500,
    ...fullPageSettings,
  },
  {
    testsPrefix: 'Page Layouts',
    variationsPath: '../.tmp/react-visualregression/stories/page-layouts/tests.js',
    ...fullPageSettings,
  },
  /* Uncomment the following vis-reg test if you are working on Compositions.
   * There are 408 visual regression tests for Compositions. Compositions are
   * also incredibly isolated from the rest of the codebase, so you shouldn't
   * need to run them unless you are working on Compositions.
   */
  // {
  // 	testsPrefix: 'Compositions',
  // 	variationsPath: `${variationsPath}/compositions/stories/variations.js`,
  // 	selectors: '#root',
  // },
];

// TODO: Investigate if it's possible to run storybook as a module
execSync('node scripts/build/storybook', (err, stdout, stderr) => {
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
    const { delay, hoverSelector, postInteractionWait, readyEvent } = component;
    const variationsFile = require(component.variationsPath);
    const variations = variationsFile && variationsFile[component.variationsProp || 'variations'];
    scenarios = scenarios.concat(
      variations.map(story => {
        const viewports = (story.viewports || component.viewports || [])
          // Create a shallow clone of viewports because Backstop mutates them
          .map(viewport => ({ ...viewport }));

        const scenarioProp = {
          label: `${component.testsPrefix} ${story.storyTitle}`,
          url: buildUrl(story.storyKind, story.storyTitle),
          selectors: [component.selectors || '#root > div > div'],
          misMatchThreshold: component.misMatchThreshold || 0.6,
          selectorExpansion: component.captureAllSelectors,
          delay,
          readyEvent,
          viewports,
        };

        const clickSelector = story.clickSelector;
        // Ship with an onReady script that enables the click selector
        if (clickSelector) {
          scenarioProp.clickSelector = clickSelector;
          scenarioProp.onReadyScript = 'onReady.js';
        }

        return scenarioProp;
      }),
    );
  });

  return scenarios;
}

const scenarios = buildScenarios();

module.exports = {
  id: 'backstop_default',
  viewports: [standardDesktopViewport],
  scenarios,
  paths: {
    bitmaps_reference: './.visual-testing/reference',
    bitmaps_test: './.visual-testing/tests',
    html_report: './.visual-testing/web-report',
    ci_report: './.visual-testing/ci-report',
    engine_scripts: './.visual-testing',
  },
  report: ['browser', 'CI'],
  engine: 'chrome',
  engineFlags: [],
  asyncCaptureLimit: 4,
  asyncCompareLimit: 50,
  debug: false,
  debugWindow: false,
};
