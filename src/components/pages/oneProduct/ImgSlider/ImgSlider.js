import React, {useState} from 'react';
import s from './ImgSlider.module.css'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Zoom } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/zoom';

import FullScreen from "@/components/pages/oneProduct/ImgSlider/FullScreen/FullScreen";
import Image from "next/image";

const ImgSlider = ({photos}) => {
    const [isFull, setIsFull] = useState(false)
    const toggleFullScreen = () => {
        if (!isFull) {
            document.body.classList.add('body-scroll-clip')
        } else {
            document.body.classList.remove('body-scroll-clip')
        }
        setIsFull(!isFull)
    }
    return (
        <>
            <Swiper
                loop={true}
                // pagination={{
                //     type: 'progressbar',
                // }}
                zoom={true}
                navigation={true}
                modules={[Pagination, Navigation, Zoom]}
                className={s.cont}
                style={{
                    "--swiper-pagination-color": "#000",
                    "--swiper-navigation-color": "#000",
                    "--swiper-navigation-size": "30px"
                }}
                onClick={toggleFullScreen}
            >
                {photos.map(el =>
                    <SwiperSlide className={s.photo}>
                        <div className={[s.photo_cont, 'swiper-zoom-container'].join(' ')}>
                            <Image src={el.url}
                                   alt={``}
                                   fill={true}
                                   loading={'eager'}
                                   className={s.photo}
                            />
                        </div>
                    </SwiperSlide>
                )
                }
            </Swiper>
            {/*<Swiper*/}
            {/*    style={{*/}
            {/*        '--swiper-navigation-color': '#fff',*/}
            {/*        '--swiper-pagination-color': '#fff',*/}
            {/*    }}*/}
            {/*    zoom={true}*/}
            {/*    navigation={true}*/}
            {/*    pagination={{*/}
            {/*        clickable: true,*/}
            {/*    }}*/}
            {/*    modules={[Zoom, Navigation, Pagination]}*/}
            {/*    className="mySwiper"*/}
            {/*>*/}
            {/*    <SwiperSlide>*/}
            {/*        <div className="swiper-zoom-container">*/}
            {/*            <img src="https://swiperjs.com/demos/images/nature-1.jpg" />*/}
            {/*        </div>*/}
            {/*    </SwiperSlide>*/}
            {/*    <SwiperSlide>*/}
            {/*        <div className="swiper-zoom-container">*/}
            {/*            <img src="https://swiperjs.com/demos/images/nature-2.jpg" />*/}
            {/*        </div>*/}
            {/*    </SwiperSlide>*/}
            {/*    <SwiperSlide>*/}
            {/*        <div className="swiper-zoom-container">*/}
            {/*            <img src="https://swiperjs.com/demos/images/nature-3.jpg" />*/}
            {/*        </div>*/}
            {/*    </SwiperSlide>*/}
            {/*    <SwiperSlide>*/}
            {/*        <div className="swiper-zoom-container">*/}
            {/*            <img src="https://swiperjs.com/demos/images/nature-4.jpg" />*/}
            {/*        </div>*/}
            {/*    </SwiperSlide>*/}
            {/*    <SwiperSlide>*/}
            {/*        <div className="swiper-zoom-container">*/}
            {/*            <img src="https://swiperjs.com/demos/images/nature-5.jpg" />*/}
            {/*        </div>*/}
            {/*    </SwiperSlide>*/}
            {/*    <SwiperSlide>*/}
            {/*        <div className="swiper-zoom-container">*/}
            {/*            <img src="https://swiperjs.com/demos/images/nature-6.jpg" />*/}
            {/*        </div>*/}
            {/*    </SwiperSlide>*/}
            {/*    <SwiperSlide>*/}
            {/*        <div className="swiper-zoom-container">*/}
            {/*            <img src="https://swiperjs.com/demos/images/nature-7.jpg" />*/}
            {/*        </div>*/}
            {/*    </SwiperSlide>*/}
            {/*    <SwiperSlide>*/}
            {/*        <div className="swiper-zoom-container">*/}
            {/*            <img src="https://swiperjs.com/demos/images/nature-8.jpg" />*/}
            {/*        </div>*/}
            {/*    </SwiperSlide>*/}
            {/*    <SwiperSlide>*/}
            {/*        <div className="swiper-zoom-container">*/}
            {/*            <img src="https://swiperjs.com/demos/images/nature-9.jpg" />*/}
            {/*        </div>*/}
            {/*    </SwiperSlide>*/}
            {/*</Swiper>*/}
            {
                isFull &&
                <FullScreen toggle={toggleFullScreen} photos={photos}/>
            }
        </>
    );
};

export default ImgSlider;