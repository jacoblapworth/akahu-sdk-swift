(() => {
	const indexFetch = fetch('index.json').then((res) => {
		return res.json();
	});

	const displayFetch = fetch('display.json').then((res) => {
		return res.json();
	});

	Promise.all([indexFetch, displayFetch]).then(([indexData, displayData]) => {
		const index = lunr.Index.load(indexData);
		const display = displayData;

		const highlight = (value, string) => {
			return string.replace(new RegExp(value, 'ig'), `<span style="background:#f8a900">${value}</span>`);
		};

		const matches = (value, string) => {
			const size = 10;

			const splitString = string.trim().split(value);

			// If the value contains white space return the first 15 words
			// Else return nothing.
			if (splitString.length === 1) {
				if(/\s/.test(value)) {
					const words = string.trim().split(' ');
					return (words.length > 15) ? words.slice(0, 15).join(' ') : '';
				}
				return '';
			}

			const result = splitString.map(function (string, index) {
				const words = string.split(' ').map(word => {
					return (word === '') ? ' ' : word;
				});

				if (words[0] !== ' ' && index === 0) {
					return words.slice(words.length - size, words.length).join(' ');
				} else if (words[words.length - 1] !== ' ' && index === splitString.length - 1) {
					return words.slice(0, size + 1).join(' ');
				} else if (words.length < size * 2) {
					return words.join(' ');
				} else {
					return `${words.slice(0, size + 1).join(' ')}</p><p>${words.slice(words.length - size, words.length).join(' ')}`
				}
			}).join(`${value}`).trim();

			return `<p>${result}</p>`;
		};

		const doSearch = (event) => {
			const searchResults = document.getElementById('search-results');
			const searchContainer = document.getElementById('search-container');
			const searchInput = event.srcElement.value;

			const searchResultList = index.search(searchInput);

			searchResults.innerHTML = '';

			if (searchResultList.length === 0) {
				searchContainer.className = 'xui-u-hidden';
			} else {
				searchContainer.className = 'xui-dropdown-positionright';
			}

			searchResultList.forEach(function (result) {
				const displayText = display[result.ref].displayText;
				const body = `${highlight(searchInput, matches(searchInput, displayText))}`;

				//Only add element if it has a body and there are less than 10 search results
				if (body !== '' && searchResults.children.length < 10) {
					const child = document.createElement('li');

					child.className = 'xui-pickitem xui-pickitem--body';
					child.innerHTML = `<a class="xs-result-text xui-pickitem--text" href="${result.ref}"><h3 class="xui-item-title">${display[result.ref].headerText}</h3>${body}</a>`;
					searchResults.appendChild(child);
				}
			});
		};

		const dismissResults = () => {
			const searchContainer = document.getElementById('search-container');
			searchContainer.className = 'xui-u-hidden';
			document.getElementById('xs-search-input').value = '';
		};

		const insertSearchElement = (id) => {
			const dropDown = document.createElement('div');
			dropDown.innerHTML = '<div class="xui-u-hidden" id="search-container"><div class="xui-dropdown--mask"></div><div class="xui-dropdown--body xs-overflow-y-auto xs-result-container"><ul class="xui-picklist" id="search-results"></ul></div></div>';
			document.getElementById(id).appendChild(dropDown);
		};

		insertSearchElement('xs-search-container');
		document.getElementById('xs-search-dismiss').addEventListener('click', dismissResults);
		document.getElementById('xs-search-input').addEventListener('keyup', doSearch);

		document.body.addEventListener('click', event => {
			const searchContainer = document.getElementById('xs-search-container');
			if (!searchContainer.contains(event.target)) {
				dismissResults();
			}
		});
	}).catch(err => {
		console.error(err);
	});
})();
