import React from 'react';
import BaseConsumer from 'BaseComponent/BaseConsumer'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
class CarouselSlide extends BaseConsumer {
    consumerContent() {
        return (
            <Carousel infiniteLoop={true}
                autoPlay
                showStatus={false}
                showThumbs={false}>
                <div>
                    <img src="/dist/contents/images/Thumb_39_1536.jpg" alt="Logo"></img>
                </div>
                <div>
                    <img src="/dist/contents/images/Thumb_39_1536.jpg" alt="Logo"></img>
                </div>
                <div>
                    <img src="/dist/contents/images/Thumb_39_1536.jpg" alt="Logo"></img>
                </div>
            </Carousel>
        );

    }
}
export default CarouselSlide