import React from 'react';
import SlideShow from 'react-slideshow-ui';
import './style.css'
class Slideshow extends React.Component {


    render() {
        return (
            <div>
                <SlideShow
                    style={{width: 800}}
                    style={{direction : 'ltr'}}
                    images={[
                        'images/slide_2.jpg',
                        'images/slide_3.jpg',
                        'images/slide_4.jpg',
                        'images/slide_5.jpg',
                        'images/slide_6.jpg',
                        'images/slide_7.jpg',
                        'images/slide_8.jpg',
                        'images/slide_9.jpg',
                        'images/slide_10.jpg',
                        'images/slide_11.jpg',
                        'images/slide_12.jpg',
                        'images/slide_13.jpg',
                        'images/slide_14.jpg',
                        'images/slide_15.jpg',
                        'images/slide_16.jpg',
                        'images/slide_17.jpg',
                        'images/slide_18.jpg'
                    ]}

                    withTimestamp={true}
                    pageWillUpdate={(index, image) => {
                            console.log(`Page Update! index: ${index}, image: ${image}`);
                    }}
                />
            </div>
        );
    }
}

export default Slideshow;

