const http = require('node:http');

if (process.argv.length < 3) {
	console.error('Usage: node gh-check-test.js <username>');
	process.exit(1);
}

(async () => {
	const body = await new Promise((resolve, reject) => {
		http.get(
			`http://localhost:3000/api/cla/check/${process.argv[2]}`,
			res => {
				let buf = '';
				res.on('data', data => {
					buf += data.toString();
				});
				res.on('end', () => {
					if (res.statusCode === 200) {
						resolve(buf);
					} else {
						reject(new Error(`Failed to check CLA: ${res.statusCode} ${res.statusMessage}`));
					}
				});
				res.on('error', reject);
			}
		);
	});

	console.log(JSON.parse(body));
})();
