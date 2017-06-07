export default (requestTime, success, failure, search) => {
	let latest = requestTime;

	fetch('https://api.whatdoestrumpthink.com/api/v1/quotes')
		.then(res => res.json())
		.then(json => json.messages.non_personalized)
		.then(messages => {

			if (requestTime === latest) {
				let constructedData = [];
				if (search) {
					const searchRegex = new RegExp(search, 'i');
					constructedData = messages.filter(msg => searchRegex.test(msg));
				} else {
					constructedData = messages;
				}

				success(constructedData);
			}
		}).catch(failure);
}
