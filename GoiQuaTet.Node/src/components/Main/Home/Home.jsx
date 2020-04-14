import React from 'react';
import BaseConsumer from 'BaseComponent/BaseConsumer'
import CarouselSlide from '../Carousel/CarouselSlide'
class Home extends BaseConsumer {
    consumerContent() {
        return (
            <CarouselSlide></CarouselSlide>
        );

    }
}
export default Home