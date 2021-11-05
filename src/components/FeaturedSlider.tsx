import React, { useState, useEffect, Suspense } from 'react';
import { IonThumbnail, IonImg, IonLabel, IonButton } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { IonicSwiper } from '@ionic/react';
import { Storage } from '@capacitor/storage';
import { useHistory } from 'react-router';
SwiperCore.use([IonicSwiper, Navigation, Pagination]);

interface ContainerProps {
    name: string;
}

const FeaturedSlider: React.FC<ContainerProps> = ({ name }) => {

    const [sliderItems, setSliderItems] = useState<any | null>([]);
    const [swiper, setSwiper] = useState<any | null>();
    const [loading, setLoading] = useState(true);
    

    //	function to go next slide
    const nextSlide = () => {
        swiper.slideNext();
    }

    //	function to go prev slide
    const prevSlide = () => {
        swiper.slidePrev();
    }

    //useEffect keep looping for fetch async
    useEffect(() => {
        const featured_products = Storage.get({ key: 'global_products' })
            .then((result) => {
                let tmp_array = [];
                let json_string = (result.value);
                const json = JSON.parse(json_string || '{}')
                const filtered_items = Object.values(json).filter(function (i: any, n: any) {
                    if (json[n]['featured'] == 1) {
                        return json[n];
                    }
                })
                setSliderItems(filtered_items);
                setLoading(false)
            })
    }, [])

    return (
        <>
            {
                !loading && sliderItems && sliderItems.length > 0 ?
                    <div className="pricelist-bottom featured-slide">
                        <div className="pricelist-slider">
                            {
                                !loading && sliderItems && sliderItems.length > 0 ?
                                    <Swiper
                                        slidesPerView={3}
                                        spaceBetween={10}
                                        allowTouchMove={true}
                                        pagination={{ clickable: false }}
                                        onSwiper={(swiper) => {
                                            setSwiper(swiper);
                                        }}
                                    >
                                        {

                                            sliderItems.map((item: any, i: any) => (
                                                <SwiperSlide key={i}>
                                                    <a href={'/product/' + item.id}>
                                                        <div className="slide-inner">
                                                        </div>
                                                        <div className="slide-outer">
                                                            <IonLabel>
                                                                {item.name}
                                                            </IonLabel>
                                                        </div>
                                                    </a>
                                                </SwiperSlide>
                                            ))
                                        }
                                    </Swiper>
                                    : ''
                            }
                            <div className="swiper-navigation">
                                <div className="swiper-button-prev">
                                    <IonButton onClick={prevSlide}>Back</IonButton>
                                </div>
                                <div className="swiper-button-next">
                                    <IonButton onClick={nextSlide}>Next</IonButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    : ''
            }
        </>
    );
};

export default FeaturedSlider;