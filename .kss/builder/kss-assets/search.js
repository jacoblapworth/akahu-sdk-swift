// This entire script becomes available in the global scrope, so we've encapsulated everything.
const buildSearch = () => {
  // Fetch some things that won't change during search.
  const pageAnchors = [...document.querySelectorAll('.ds-nav--item--index, .ds-nav--child')];
  const navSearchInput = document.getElementById('search-select-input');
  const resultsParent = document.getElementById('search-results').parentNode;
  const baseLi = document.getElementById('search-results').firstElementChild.cloneNode(true);
  const dropdown = document.querySelector('.ds-nav--searchDropdown');
  // Some lets scoped to this function.
  let firstResult;
  let hideDropdownOnBlur;
  let pageList;

  // Scrape the navigation for the relevant data to populate the search.
  if (pageAnchors && pageAnchors.length) {
    pageList = pageAnchors.map(anchor => {
      return { url: anchor.getAttribute('href'), title: anchor.innerText || anchor.innerHTML.trim() }
    })
  }
  if (navSearchInput && pageList.length && dropdown) {
    navSearchInput.addEventListener('keyup', e => {
      // Elements to fetch fresh for each keyup.
      const navSearchDropdownUl = document.getElementById('search-results');
      const clonedUl = navSearchDropdownUl.cloneNode();
      const searchValue = navSearchInput.value;

      // Handles empty input value.
      if (!searchValue) {
        clearSearchValues();
        closeSearchDropdown();
        return;
      }

      // Run the query and get matches.
      const query = new RegExp(navSearchInput.value, 'i');
      const results = pageList.filter(page => {
        return page.title.match(query);
      });

      // No-results handler.
      if (!results.length) {
        const emptyItem = document.createElement('li');
        emptyItem.className = 'xui-pickitem xui-pickitem-medium xui-padding-vertical-xsmall xui-padding-horizontal-large';
        emptyItem.innerHTML = 'No results found';
        clonedUl.appendChild(emptyItem);
      }

      // When there are matches...
      results.forEach((match, index) => {
        // Clone the sample base list item from the existing markup,
        // and identify its children, for editing.
        const resultItem = baseLi.cloneNode(true);
        const resultLink = resultItem.firstElementChild;
        const resultSpan = resultLink.firstElementChild;

        // Set the relevant href and text.
        resultLink.href = match.url;
        resultSpan.innerHTML = match.title;

        // Attach arrow navigation between links.
        resultLink.addEventListener('keydown', e => {
          if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            focusSibling({ currentItem: resultItem, event: e });
          }
        });
        // If focusing out of the items, check if the dropdown should close.
        resultLink.addEventListener('blur', () => {
          hideDropdownOnBlur = hideDropdownIfBlurred();
        });

        // Store the first result anchor for focus/keyboard uses.
         if (index === 0) {
          firstResult = resultLink;
        }

        // Add the new pickitem to the new <ul>
        clonedUl.appendChild(resultItem);
      });
      // Replace the old <ul> with the new <ul> and open the dropdown.
      resultsParent.appendChild(clonedUl);
      resultsParent.removeChild(navSearchDropdownUl);
      openSearchDropdown();
    });
    // Cancel the blur-closure if going from list to input.
    navSearchInput.addEventListener('focus', e => {
      clearTimeout(hideDropdownOnBlur);
    });
    // When un-focusing the textinput, close the dropdown...
    navSearchInput.addEventListener('blur', e => {
      hideDropdownOnBlur = hideDropdownIfBlurred();
    });
    // When using arrow key from inside the search input,
    // focus the first link and cancel the blur-closure of the dropdown.
    navSearchInput.addEventListener('keydown', e => {
      if (firstResult && e.key == "ArrowDown") {
        (firstResult.focus && firstResult.focus()) || (firstResult.setActive && firstResult.setActive());
        clearTimeout(hideDropdownOnBlur);
        e.preventDefault();
      }
    });
  }

  // Empties the value, firstResult var, and replaces the results list with an empty <ul>.
  const clearSearchValues = () => {
    const navSearchDropdownUl = document.getElementById('search-results');
    const clonedUl = navSearchDropdownUl.cloneNode();
    resultsParent.appendChild(clonedUl);
    resultsParent.removeChild(navSearchDropdownUl);
    navSearchInput.value = '';
    firstResult = undefined;
  };

  // Closes the dropdown
  const closeSearchDropdown = () => {
    dropdown.className = 'ds-nav--searchDropdown xui-u-hidden-visually';
    dropdown.setAttribute('aria-hidden', 'true');
    dropdown.parentNode.setAttribute('aria-expanded', 'false');
    clearTimeout(hideDropdownOnBlur);
  };

  // Opens the dropdown and sets the max-height.
  const openSearchDropdown = () => {
    // Have to show the dropdown before it has any position to be measured.
    dropdown.className = 'ds-nav--searchDropdown xui-dropdown-is-open';
    dropdown.setAttribute('aria-hidden', 'false');
    dropdown.parentNode.setAttribute('aria-expanded', 'true');
    const dropdownRect = resultsParent.getBoundingClientRect();
    const maxHeight = window.innerHeight - dropdownRect.top - 20; // viewport gutter x2
    resultsParent.style.maxHeight = `${maxHeight}px`;
  };

  // Given a pickitem and a keyboard arrow event, focus either the next or previous sibling item.
  const focusSibling = ({currentItem, event}) => {
    const targetItem = event.key === 'ArrowUp' ? currentItem.previousSibling : currentItem.nextSibling;
    let targetLink = targetItem && targetItem.getElementsByTagName('a')[0];
    // If there's no sibling item in the desired direction, loop around to the other end of the list.
    if (!targetLink) {
      targetLink = event.key === 'ArrowUp' ? currentItem.parentNode.lastChild.getElementsByTagName('a')[0] : firstResult;
    }
    (targetLink && targetLink.focus && targetLink.focus()) ||
      (targetLink && targetLink.setActive && targetLink.setActive());
    event.preventDefault();
    return;
  };

  // If the focused element is not within the dropdown, close the dropdown.
  // This requires a very small timeout to allow for a focus change to register.
  const hideDropdownIfBlurred = () => {
    return setTimeout(() => {
      const focusedElement = document.activeElement;
      const contained = dropdown.contains(focusedElement);
      if (!contained) {
        clearSearchValues();
        closeSearchDropdown();
      }
    }, 100)
  };
};
