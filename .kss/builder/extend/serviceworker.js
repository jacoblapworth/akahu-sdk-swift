const { SERVICE_WORKER = 'false' } = process.env;
const isServiceWorker = SERVICE_WORKER === 'true';
const serviceWorker = (`
<script>
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', function() {
			navigator.serviceWorker.register('./sw.js');
		});
	}
</script>
`);

module.exports = function(handlebars) {

	handlebars.registerHelper('serviceWorker', function() {
		return new handlebars.SafeString(isServiceWorker ? serviceWorker : '');
	});

}
