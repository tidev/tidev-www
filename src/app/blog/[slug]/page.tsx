import { loadContent } from '@/lib/content';

type BlogParams = {
	params: {
		slug: string;
	};
}

export async function generateMetadata({ params }: BlogParams) {
	const page = await loadContent('posts', params.slug);
	if (page) {
		const { data } = page;
		return {
			title: data.title,
			description: data.teaser
		};
	}
}

export default async function BlogPost({ params }: BlogParams) {
	const page = await loadContent('posts', params.slug);
	if (!page) {
		return {
			notFound: true,
		};
	}

	const { content, data } = page;

    return (
        <>
            <div className='mx-auto prose'>
                <div className='prose'>
                    <h1>{data.title}</h1>
                </div>
                <div className='flex flex-wrap overflow-hidden pt-10'>
                    <div className='blog-content lg:w-3/4 overflow-hidden sm:w-full text-left' dangerouslySetInnerHTML={{ __html: content }} />

                    <div className='lg:w-1/4 overflow-hidden sm:w-full'>
                        <span className='mt-5 bg-blue-500 dark:bg-blue-700 w-fit flex px-3 py-1.5 leading-none rounded-full text-xs font-medium uppercase text-white'>
                            <span>{data.category}</span>
                        </span>
                        <p className='pt-2 text-xs font-medium'>
							{data.date &&
								<>
									{new Date(data.date).toLocaleDateString('en')}
									<br />
								</>}
                            {data.author}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
