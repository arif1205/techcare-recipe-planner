const AppHeader = () => {
	return (
		<header className='relative w-full sm:h-64 h-40'>
			<div className='absolute inset-0 sm:-top-44 -top-20'>
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
