export default function MarkdownPageLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className='mx-auto prose'>
			{children}
		</div>
	);
}
