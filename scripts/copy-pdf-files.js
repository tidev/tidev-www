const { copyFileSync, readdirSync } = require('fs');

copyFileSync(
	'node_modules/pdfjs-dist/build/pdf.worker.min.mjs',
	'public/pdf.worker.mjs'
);

const fonts = readdirSync('node_modules/pdfjs-dist/standard_fonts');
for (const font of fonts) {
	copyFileSync(
		`node_modules/pdfjs-dist/standard_fonts/${font}`,
		`public/standard_fonts/${font}`
	);
}
