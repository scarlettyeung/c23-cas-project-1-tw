import React from 'react';
import '../styles/event.css';

function Events() {
	return (
		<div className='Body'>
			<div className='Title'>Events</div>

			<div className='CardBody'>
				<div className='Card'>
					<img className='CardImage' src='../../event2.jpeg' alt='Joasis logo' />
				</div>
				<div className='CardContent'>
					<div className='CardTitle'> Art Exhibitions</div>
					<div className='ContentText'>
						Victoria and Albert Museum (V&A) and designed by revered Hong Kong Production Designer
						William Chang Suk Ping...
					</div>
					<input className='CardBtn' type='button' value='More'></input>
				</div>
			</div>
		</div>
	);
}

export default Events;
