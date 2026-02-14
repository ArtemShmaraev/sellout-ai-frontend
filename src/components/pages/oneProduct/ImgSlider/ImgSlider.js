import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';
import s from './ImgSlider.module.css'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Zoom } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/zoom';
import 'swiper/css/effect-fade';
import FullScreen from "@/components/pages/oneProduct/ImgSlider/FullScreen/FullScreen";
import Image from "next/image";
import {Context} from "@/context/AppWrapper";


const ImgSlider = ({photos}) => {

    const {desktopStore} = useContext(Context)
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);


    const [isFull, setIsFull] = useState(false)
    useLayoutEffect(() => {

    }, []);


    const toggleFullScreen = (index) => {
        if (!desktopStore.isDesktop) {
            if (!isFull) {
                document.body.classList.add('body-scroll-clip')
            } else {
                document.body.classList.remove('body-scroll-clip')
            }
            setIsFull(!isFull)
            setSelectedPhotoIndex(index.realIndex)
        }
    }

    return (
        <>

            <Swiper
                loop={true}
                pagination={(desktopStore.isDesktop || photos.length > 9)? {type: 'bullets'} : { type: 'bullets' }}
                // pagination={true}

                // effect={"fade"}

                // zoom={true}
                initialSlide={0}
                navigation={desktopStore.isDesktop || photos.length > 9}
                modules={[Pagination, Zoom, Navigation]}
                className={s.cont}
                // className={s.photo}
                style={{
                    '--swiper-pagination-color': 'rgba(0,0,0,0.9)',
                    '--swiper-pagination-bullet-inactive-color': 'radial-gradient(circle, #000000 35%, rgba(255, 255, 255, 0) 50%)',
                    '--swiper-pagination-top': 'auto', // Убираем верхний отступ
                    '--swiper-pagination-bottom': desktopStore.isDesktop ? '-7px' : "20px", // Задаем отступ от нижнего края
                    '--swiper-pagination-progressbar-size': '2px',
                    '--swiper-pagination-bullet-size': '10px',
                    '--swiper-pagination-bullet-horizontal-gap': '12px',
                    // '--swiper-pagination-bullet-border-radius': '25%',
                    '--swiper-pagination-progressbar-bg-color': 'rgba(0,0,0,0.1)',
                    "--swiper-navigation-color": "rgba(0,0,0,0.5)",
                }}
                onClick={toggleFullScreen}
            >
                {photos.map((el, index)=>
                    <SwiperSlide
                        key={index}
                        className={s.photo}
                        onClick={() => toggleFullScreen(index)}
                    >
                        <div className={s.photo_cont}>
                            <Image src={el.url}
                                   itemProp={index === 1 ? "image" : ""}
                                   alt={``}
                                   fill={true}
                                   loading={index <= 1 ? "eager" : "lazy"}
                                   className={s.photo}
                                   style={{
                                       // position: 'relative',
                                       objectFit: 'contain',
                                       // objectPosition: "center bottom",
                                       // height: '100%',
                                   }}
                            />
                        </div>
                    </SwiperSlide>
                )
                }
            </Swiper>
            <div style={{ opacity: isFull ? 1 : 0, pointerEvents: isFull ? 'auto' : 'none' }}>
                <FullScreen toggle={toggleFullScreen} photos={photos} initialIndex={selectedPhotoIndex} />
            </div>

            {/*{*/}
            {/*    isFull &&*/}
            {/*    <FullScreen toggle={toggleFullScreen} photos={photos} initialIndex={selectedPhotoIndex}/>*/}
            {/*}*/}
        </>
    );
};

export default ImgSlider;