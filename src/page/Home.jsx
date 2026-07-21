import React from 'react';
import Hero from '../components/Hero.jsx';
import NearbyShop from '../components/nearbyShop.jsx';
import WhyChoseUs from '../components/whychoseUs.jsx';
import Review from '../components/review.jsx';
import useTitle from '../utils/useTitle.js';

function Home() {
        useTitle('Home');
        return (
            <>
                <Hero />
                <NearbyShop />
                <WhyChoseUs />
                <Review />
            </>
        );
}

export default Home;