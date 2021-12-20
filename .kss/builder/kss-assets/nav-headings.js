// Script to highlight sticky navigation with content header links (3rd column) based on current scroll position.

const initHeadingNav = () => {
  let headingIds = [];
  let lastVisible;
  let windowHeight = window.innerHeight;
  const headerNav = document.querySelector('.ds-nav-sticky-wrapper');

  if (headerNav) {
    // Use both selectors in one to maintain page order.
    const headingNodes = document.querySelectorAll('.ds-title--level-2 .ds-anchor, .ds-title--level-3 .ds-anchor');

    // Filter out headers not shown in the nav (e.g. h3 for sections other than "features of...")
    const headings = [...headingNodes].filter(heading => {
      const id = heading.getAttribute('href').substr(1);
      const navId = `#otp-${id}`;

      return !!document.querySelector(navId);
    });

    headings.forEach(link => {
      // strip # from an id
      headingIds.push(link.getAttribute('href').substr(1));
    });

    headingIds.reverse();

    const highlightOtpHeading = () => {
      const highlightedHeadingId = headingIds.find(headingId => {
        const headingElement = document.getElementById(headingId);
        const paddingTop = parseFloat(window.getComputedStyle(headingElement.querySelector('.ds-title'))['padding-top']);

        // Don't update if only padding top is visible, wait for the heading.
        const offsetFromTop = headingElement.getBoundingClientRect().y + paddingTop;

        // if visible in viewport
        return offsetFromTop < windowHeight && offsetFromTop > 0;
      }) || lastVisible;

      lastVisible = highlightedHeadingId;

      headingIds.forEach(headingId => {
        const element = document.getElementById(`otp-${headingId}`);

        if (element) {
          headingId === highlightedHeadingId ? element.classList.add('ds-nav-sticky--list--highlighted') : element.classList.remove('ds-nav-sticky--list--highlighted');
        }
      });
    }

    document.addEventListener('scroll', highlightOtpHeading);
    highlightOtpHeading();
  }
}

