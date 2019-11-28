async function wait(ms) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = async (page, scenario) => {
  const { clickSelector, hoverSelector } = scenario;

  const xuiMotionDelayLong = 500;

  if (clickSelector) {
    page.click(clickSelector);
  }

  if (hoverSelector) {
    page.hover(hoverSelector);
  }

  await wait(xuiMotionDelayLong);
};
