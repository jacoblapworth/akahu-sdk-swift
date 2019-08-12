module.exports = (page, scenario) => {
  const { clickSelector, hoverSelector } = scenario;

  if (clickSelector) {
    page.click(clickSelector);
  }

  if (hoverSelector) {
    page.rect(hoverSelector).result(rect => {
      page.mouseMoved(rect.left, rect.top);
    });
  }
};
