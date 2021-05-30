async function wait(ms) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = async (page, scenario) => {
  const { clickSelector, hoverSelector, useCustomFontSize } = scenario;
  const xuiMotionDelayLong = 500;

  await page.evaluate(() => {
    document.head.insertAdjacentHTML(
      'beforeend',
      `<style>
        * {
          caret-color: transparent !important;
        }
      </style>`,
    );
  });

  if (clickSelector) {
    await page.click(clickSelector);
    await wait(xuiMotionDelayLong);
  }

  if (hoverSelector) {
    await page.hover(hoverSelector);
    await wait(xuiMotionDelayLong);
  }

  // Used to test whether `rem` unit takes effect
  if (useCustomFontSize) {
    await page.evaluate(() => {
      document.documentElement.style.fontSize = '130%';
    });
  }

  await page.waitFor(() => {
    const imagesLoading = Array.from(document.querySelectorAll('img'))
      .filter(image => image.src !== '')
      .filter(image => !image.complete);

    return imagesLoading.length === 0;
  });
};
