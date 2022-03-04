const backstop = require('backstopjs');
const { EventEmitter } = require('events');
const path = require('path');
const { argv } = require('yargs');

const NOOP = () => {};
// Polyfill `Element` for Node JS
global.Element = typeof Element === 'undefined' ? NOOP : Element;

const projectDirectory = argv.docker ? '../' : './';
function relativeToProjectDirectory(path) {
  return `${projectDirectory}${path}`;
}

const originalRequire = require;

require = id => originalRequire(relativeToProjectDirectory(id));

const { standardDesktopViewport } = require('../src/react/stories/helpers/viewports');

EventEmitter.defaultMaxListeners = 15;

const storyBookLocation = path.resolve(projectDirectory, 'dist', 'docs', 'storybook');
const testingDomain = path.resolve(storyBookLocation, 'iframe.html?');
const variationsPath = relativeToProjectDirectory('.tmp/react-visualregression/components');

// For components or compositions with absolutely-positioned elements, use fullPageSettings.
const fullPageSettings = {
  selectors: '.xui-container',
};

/**
 * Array of components that storybook should test.
 *
 * Example of full component to test implementation:
 * {
 * 	testsPrefix: 'XUI Pill',
 *	variationsPath: `${variationsPath}/pill/stories/variations.js`,
 *	variationsProp: 'myVariationsPropName', (defaults to 'variations')
 *	selectors: 'alternate > .selectors' (defaults to '.xui-default-decorator')
 *	misMatchThreshold: 5 (percentage variance to allow, defaults to 0)
 *	delay: adds a delay between onReady and capture
 * }
 */
const componentsToTest = [
  /* PLOP_INJECT_IMPORT */
  {
    testsPrefix: 'XUI Accordion',
    variationsPath: `${variationsPath}/accordion/stories/variations.js`,
  },
  {
    testsPrefix: 'XUI Actions',
    variationsPath: `${variationsPath}/actions/stories/variations.js`,
  },
  {
    testsPrefix: 'XUI Autocompleter',
    variationsPath: `${variationsPath}/autocompleter/stories/variations.js`,
    ...fullPageSettings,
  },
  {
    testsPrefix: 'XUI Avatar',
    variationsPath: `${variationsPath}/avatar/stories/variations.js`,
  },
  {
    testsPrefix: 'XUI Banner',
    variationsPath: `${variationsPath}/banner/stories/variations.js`,
  },
  {
    testsPrefix: 'XUI Bar Chart',
    variationsPath: `${variationsPath}/chart/stories/variations.js`,
    readyEvent: 'xui-bar-chart-ready-event',
    delay: 500,
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
    delay: 5000,
  },
  {
    testsPrefix: 'XUI Content Block',
    variationsPath: `${variationsPath}/contentblock/stories/variations.js`,
  },
  {
    testsPrefix: 'XUI Date Input',
    variationsPath: `${variationsPath}/dateinput/stories/variations.js`,
    variationsProp: 'dateInputVariations',
    ...fullPageSettings,
  },
  {
    testsPrefix: 'XUI Date Picker',
    variationsPath: `${variationsPath}/datepicker/stories/variations.js`,
  },
  {
    testsPrefix: 'XUI Date Range Input',
    variationsPath: `${variationsPath}/dateinput/stories/variations.js`,
    variationsProp: 'dateRangeInputVariations',
    ...fullPageSettings,
  },
  {
    testsPrefix: 'XUI Dropdown',
    variationsPath: `${variationsPath}/dropdown/stories/variations.js`,
    ...fullPageSettings,
  },
  {
    testsPrefix: 'XUI Editable Table',
    variationsPath: `${variationsPath}/editabletable/stories/variations.js`,
  },
  {
    testsPrefix: 'XUI File Preview',
    variationsPath: `${variationsPath}/filepreview/stories/variations.js`,
    ...fullPageSettings,
  },
  {
    testsPrefix: 'XUI File Uploader',
    variationsPath: `${variationsPath}/fileuploader/stories/variations.js`,
  },
  {
    testsPrefix: 'XUI Fixed Footer WIP',
    variationsPath: `${variationsPath}/fixedfooter/stories/variations.js`,
    readyEvent: 'xui-fixedfooter-ready-event',
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
    testsPrefix: 'XUI Control Group',
    variationsPath: `${variationsPath}/controlgroup/stories/variations.js`,
  },
  {
    testsPrefix: 'XUI Intro Banner',
    variationsPath: `${variationsPath}/introbanner/stories/variations.js`,
  },
  {
    testsPrefix: 'XUI Isolation Header',
    variationsPath: `${variationsPath}/isolationheader/stories/variations.js`,
  },
  {
    testsPrefix: 'XUI Loader',
    variationsPath: `${variationsPath}/loader/stories/variations.js`,
  },
  {
    testsPrefix: 'XUI Modal',
    variationsPath: `${variationsPath}/modal/stories/variations.js`,
    ...fullPageSettings,
  },
  {
    testsPrefix: 'XUI Overview Block',
    variationsPath: `${variationsPath}/overviewblock/stories/variations.js`,
  },
  {
    testsPrefix: 'XUI Page Header',
    variationsPath: `${variationsPath}/pageheader/stories/variations.js`,
  },
  {
    testsPrefix: 'XUI Pagination',
    variationsPath: `${variationsPath}/pagination/stories/variations.js`,
  },
  {
    testsPrefix: 'XUI Panel',
    variationsPath: `${variationsPath}/panel/stories/variations.js`,
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
    testsPrefix: 'XUI Popover',
    variationsPath: `${variationsPath}/popover/stories/variations.js`,
    readyEvent: 'xui-popover-ready-event',
  },
  {
    testsPrefix: 'XUI Progress Indicator',
    variationsPath: `${variationsPath}/progressindicator/stories/variations.js`,
    readyEvent: 'xui-progress-ready-event',
  },
  {
    testsPrefix: 'XUI Radio',
    variationsPath: `${variationsPath}/radio/stories/variations.js`,
  },
  {
    testsPrefix: 'XUI Range',
    variationsPath: `${variationsPath}/range/stories/variations.js`,
  },
  {
    testsPrefix: 'XUI Rollover Checkbox',
    variationsPath: `${variationsPath}/rollovercheckbox/stories/variations.js`,
  },
  {
    testsPrefix: 'XUI Select Box',
    variationsPath: `${variationsPath}/selectbox/stories/variations.js`,
    ...fullPageSettings,
  },
  {
    testsPrefix: 'XUI Switch',
    variationsPath: `${variationsPath}/switch/stories/variations.js`,
    delay: 5000,
  },
  {
    testsPrefix: 'XUI Stepper',
    variationsPath: `${variationsPath}/stepper/stories/variations.js`,
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
    testsPrefix: 'XUI Text Input',
    variationsPath: `${variationsPath}/textinput/stories/variations.js`,
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
    selectors: '.xui-tooltip-test',
  },
  {
    testsPrefix: 'Structural',
    variationsPath: `${variationsPath}/structural/stories/variations.js`,
  },
  {
    testsPrefix: 'Use cases',
    variationsPath: relativeToProjectDirectory(
      '.tmp/react-visualregression/stories/use-cases/tests.js',
    ),
    selectors: '.xui-container',
  },
  {
    testsPrefix: 'Form controls',
    variationsPath: relativeToProjectDirectory(
      '.tmp/react-visualregression/stories/form-controls/tests.js',
    ),
    selectors: '.capture',
  },
  /* Run `npm run test:visual Compositions` if you are working on Compositions.
   * There are 408 visual regression tests for Compositions. Compositions are
   * also incredibly isolated from the rest of the codebase, so you shouldn't
   * need to run them unless you are working on Compositions.
   */
  {
    testsPrefix: 'Compositions',
    variationsPath: `${variationsPath}/compositions/stories/variations.js`,
    selectors: '.xui-composition',
  },
];

function buildUrl(kind, story) {
  const urlSearch = `selectedKind=${kind}&selectedStory=${story}`;
  return `file://${testingDomain}${urlSearch}`;
}

function buildScenarios() {
  let scenarios = [];
  componentsToTest
    .filter(({ testsPrefix }) => {
      if (testsPrefix === 'Compositions') {
        return argv._.includes('Compositions');
      }
      if (argv._.length === 0) {
        return true;
      }
      for (const expression of argv._) {
        if (testsPrefix.match(new RegExp(expression, 'gi'))) {
          return true;
        }
      }
      return false;
    })
    .forEach(component => {
      const { delay, readyEvent } = component;
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
            selectors: [story.selectors || component.selectors || '.xui-default-decorator'],
            misMatchThreshold: story.misMatchThreshold || component.misMatchThreshold || 0,
            selectorExpansion: component.captureAllSelectors,
            delay,
            readyEvent,
            viewports,
          };

          scenarioProp.onBeforeScript = 'onBefore.js';

          const { clickSelector, hoverSelector, useCustomFontSize } = story;
          // Ship with an onReady script that enables the click/hover selector
          if (clickSelector || hoverSelector) {
            if (clickSelector) {
              scenarioProp.clickSelector = clickSelector;
            } else {
              scenarioProp.hoverSelector = hoverSelector;
            }
          }
          scenarioProp.useCustomFontSize = useCustomFontSize;
          scenarioProp.onReadyScript = 'onReady.js';

          return scenarioProp;
        }),
      );
    });

  return scenarios;
}

const scenarios = buildScenarios();
const totalTests = scenarios.reduce((acc, scenario) => acc + (scenario.viewports.length || 1), 0);

global.backstopProgress = {
  completed: 0,
  total: totalTests,
};

backstop('test', {
  config: {
    debug: false,
    debugWindow: false,
    docker: true,
    engine: 'puppeteer',
    engineOptions: {
      defaultViewport: null,
      ignoreHTTPSErrors: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
    fileNameTemplate: '{configId}_{scenarioLabel}_{viewportLabel}',
    id: 'backstop_default',
    paths: {
      bitmaps_reference: './.visual-testing/reference',
      bitmaps_test: './.visual-testing/tests',
      html_report: './.visual-testing/web-report',
      ci_report: './.visual-testing/ci-report',
      engine_scripts: './.visual-testing',
    },
    report: ['CI'],
    scenarios,
    viewports: [standardDesktopViewport],
  },
}).catch(() => {
  process.exit(1);
});
