async function wait(ms) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = async (page, scenario) => {
  const { clickSelector, hoverSelector } = scenario;

  const xuiMotionDelayLong = 500;

  if (clickSelector) {
    await page.click(clickSelector);
    await wait(xuiMotionDelayLong);
  }

  if (hoverSelector) {
    await page.hover(hoverSelector);
    await wait(xuiMotionDelayLong);
  }

  await page.waitFor(() => {
    const imagesLoading = Array.from(document.querySelectorAll('img'))
      .filter(image => image.src !== '')
      .filter(image => !image.complete);

    return imagesLoading.length === 0;
  });
};
