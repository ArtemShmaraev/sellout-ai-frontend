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
            setSelectedPhotoIndex(index)
        }
    }

    return (
        <>

            <Swiper
                loop={true}
                // pagination={{
                //     type: 'progressbar',
                // }}
                // effect={"fade"}

                // zoom={true}
                initialSlide={0}
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
                {photos.map((el, index)=>
                    <SwiperSlide
                        key={index}
                        className={s.photo}
                        onClick={() => toggleFullScreen(index)}
                    >
                        <div className={s.photo_cont}>
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

            {
                isFull &&
                <FullScreen toggle={toggleFullScreen} photos={photos} initialIndex={selectedPhotoIndex}/>
            }
        </>
    );
};

export default ImgSlider;