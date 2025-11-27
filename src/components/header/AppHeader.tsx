const AppHeader = () => {
	return (
		<header className='relative w-full h-64'>
			<div className='absolute inset-0 -top-44'>
				<img
					src='/images/food.jpg'
					alt='Food ingredients'
					className='w-full h-full object-cover scale-x-[-1]'
					loading='lazy'
					fetchPriority='low'
				/>
				<div className='absolute inset-0 bg-black/30' />
			</div>
		</header>
	);
};

export default AppHeader;
