import Link from 'next/link';

export default function DownloadPDF() {
	return (
		<div className='px-12 py-2 mb-10 text-center rounded-xl bg-opacity-25 bg-black'>
			<p className='my-10'>Thank you for signing the Contributor License Agreement! You can download your signed PDF below:</p>
			<p className='my-10'>
				<a className='button' href='/api/cla/download' target='_blank'>Download Your Signed CLA</a>
			</p>
			<p className='my-10'>
				Next step is to head over to <Link href="https://github.com/tidev">GitHub</Link> and find a project you'd like to contribute to!
			</p>
		</div>
	);
}
