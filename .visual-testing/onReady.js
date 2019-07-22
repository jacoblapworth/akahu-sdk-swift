module.exports = (page, scenario) => {
  const clickSelector = scenario.clickSelector;
  page.click(clickSelector);
};
