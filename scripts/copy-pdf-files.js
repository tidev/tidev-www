const { copyFileSync, readdirSync } = require('fs');

copyFileSync(
	'node_modules/pdfjs-dist/build/pdf.worker.min.js',
	'public/pdf.worker.js'
);

const fonts = readdirSync('node_modules/pdfjs-dist/standard_fonts');
for (const font of fonts) {
	copyFileSync(
		`node_modules/pdfjs-dist/standard_fonts/${font}`,
		`public/standard_fonts/${font}`
	);
}
