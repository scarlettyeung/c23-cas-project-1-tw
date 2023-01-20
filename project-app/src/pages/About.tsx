import React from 'react';
import UserCardImage from '../components/AboutPage/Profile';

function About() {
	return (
		<div className='Body'>
			<div className='Title'>About</div>
			<UserCardImage image={''} avatar={''} name={''} job={''} stats={[]} />
		</div>
	);
}

export default About;
