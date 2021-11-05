import React, { useState, useEffect } from 'react';
import { IonThumbnail, IonImg, IonLabel, IonButton } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { IonicSwiper } from '@ionic/react';
import 'swiper/swiper-bundle.min.css';
import '@ionic/react/css/ionic-swiper.css';
import { Storage } from '@capacitor/storage';
import { useHistory } from 'react-router';
SwiperCore.use([IonicSwiper, Navigation, Pagination]);


interface ContainerProps {
    name: string;
}

//slides options
const slideOpts = {
    initialSlide: 0,
    speed: 800
};
//defining type for type array 
type Item = {
    src: string;
    title: string;
    text: string;
};
//array for spalsh screen
const items: Item[] = [{ src: 'assets/images/splash1.svg', title: 'Check & Report', text: 'Lorem ipsum  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincid' }, { src: 'assets/images/splash2.svg', title: 'Create your baskets lists', text: 'Lorem ipsum  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincid' }, { src: 'assets/images/splash3.svg', title: 'Login for best experience', text: 'Lorem ipsum  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincid' }];


const Splash: React.FC<ContainerProps> = ({ name }) => {

    // for routing purposes
    const history = useHistory();

    //states
    const [swiper, setSwiper] = useState<any | null>(null);

    //	function to go next slide
    const nextSlide = () => {
        swiper.slideNext();
    }

    //	function to go prev slide
    const prevSlide = () => {
        swiper.slidePrev();
    }

    //	function to go skip slide
    const skipSlide = () => {
        //set a global variable
        history.push("/prepare-data");
    }

    // Check for first time function
    const checkFirstTime = async () => {
        //get first_time variable to know if true OR not
        const { value } = await Storage.get({ key: 'first_time' });
        if (value && value == 'false') {
            history.push("/prepare-data");
        } else {
            Storage.set({
                key: 'first_time',
                value: 'false',
            });
        }
    };

    useEffect(() => {
        checkFirstTime();
    }, []);

    return (
        <>
            <div className="cnMainWrap">
                <div className="splash-slider-wrapper">
                    <div className="splash-slider">
                        <Swiper
                            initialSlide={0}
                            speed={200}
                            slidesPerView={1}
                            allowTouchMove={true}
                            pagination={{ clickable: true }}
                            onSwiper={(swiper) => {
                                setSwiper(swiper);
                            }}
                        >
                            {items.map((item, i) => (
                                <SwiperSlide key={i}>
                                    <div className="cnOuter">
                                        <div className="cnMiddle">
                                            <div className="cnInner">
                                                <div className="cnSplashImg">
                                                    <IonThumbnail slot="start">
                                                        <IonImg src={item.src} />
                                                    </IonThumbnail>
                                                </div>
                                                <div className="cnSplashTxt">
                                                    <div className="cnTitle">
                                                        <IonLabel>{item.title}</IonLabel>
                                                    </div>
                                                    <div className="cnText">
                                                        <IonLabel>{item.text}</IonLabel>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {i == 0 ? <div className="action-buttons-first"><div className="cnSkip"><IonButton onClick={skipSlide}>Skip</IonButton></div><div className="cnNext"><IonButton onClick={nextSlide}>Next</IonButton></div></div> : ''}
                                    {i != items.length - 1 && i != 0 ? <div className="action-buttons-last"><div className="cnBack"><IonButton onClick={prevSlide}>Back</IonButton></div><div className="cnNext"><IonButton onClick={nextSlide}>Next</IonButton></div></div> : ''}
                                    {i == items.length - 1 ? <div className="action-buttons-last"><div className="cnBack"><IonButton onClick={prevSlide}>Back</IonButton></div><div className="cnContinue"><IonButton onClick={skipSlide}>Continue</IonButton></div></div> : ''}
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Splash;