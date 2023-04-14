const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const { readFile, writeFile } = require('node:fs/promises');

(async () => {
	if (process.argv.length < 4) {
		console.error('USAGE: node formalize-cla.js <in> <out>');
		process.exit(1);
	}

	const inFile = process.argv[2];
	const outFile = process.argv[3];

	const existingPdfBytes = await readFile(inFile);
	const pdfDoc = await PDFDocument.load(existingPdfBytes);
	const font = await pdfDoc.embedFont(StandardFonts.CourierBold);
	const pages = pdfDoc.getPages();
	const page = pages[4];
	const { height } = page.getSize();

	const now = new Date();
	const today = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

	const drawText = (x, y, str) => {
		page.drawText(str, {
			x,
			y: height - y,
			size: 10,
			font
		});
	};

	const drawImage = async (x, y, file, scale) => {
		const bytes = await readFile(file);
		const image = await pdfDoc.embedPng(bytes);
		const { width: w, height: h } = image.scale(scale);
		page.drawImage(image, {
			x,
			y: height - y,
			width: w,
			height: h
		});
	};

	await drawImage(78, 192, 'JoshSignature.png', 0.3);
	drawText(80, 248, 'Joshua Lambert');
	drawText(80, 306, 'Board Chairman');
	drawText(80, 364, 'TiDev, Inc.');
	drawText(80, 422, 'tidev@smalltownhosting.com');
	drawText(80, 480, today);

	await drawImage(312, 192, 'JoshSignature.png', 0.3);
	drawText(314, 248, 'Joshua Lambert');
	drawText(314, 306, 'Board Chairman');
	drawText(314, 364, 'TiDev, Inc.');
	drawText(314, 422, 'tidev@smalltownhosting.com');
	drawText(314, 480, today);
	drawText(314, 538, 'username');

	const pdfBytes = await pdfDoc.save();
	await writeFile(outFile, pdfBytes);
})();
