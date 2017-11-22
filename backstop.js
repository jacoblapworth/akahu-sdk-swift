const XUIPillStories = require('./src/react/components/pill/stories/variations.js').variations;

function buildUrl(kind, story) {
	const testingDomain = 'http://localhost:9001/iframe.html?';
	return `${testingDomain}selectedKind=${kind}&selectedStory=${story}`;
}

const XUIPillScenarios = XUIPillStories.map(story => {
	return {
		label: `XUI Pill ${story.storyTitle}`,
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
  onBeforeScript: "chromy/onBefore.js",
  onReadyScript: "chromy/onReady.js",
  scenarios: [
		...XUIPillScenarios
  ],
  paths: {
    bitmaps_reference: "backstop_data/bitmaps_reference",
    bitmaps_test: "backstop_data/bitmaps_test",
    engine_scripts: "backstop_data/engine_scripts",
    html_report: "backstop_data/html_report",
    ci_report: "backstop_data/ci_report"
  },
  report: ["browser", "CI"],
  engine: "chrome",
  engineFlags: [],
  asyncCaptureLimit: 5,
  asyncCompareLimit: 50,
  debug: false,
  debugWindow: false
}
