import React, {useEffect, useState} from 'react';
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
    const [isDesktop, setIsDesktop] = useState(true)
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
    const checkIsDesktop = () => {
        const width = window.innerWidth
        if (width <= 1200) {
            setIsDesktop(false)
        } else {
            setIsDesktop(true)
        }
    }
    useEffect(() => {
        window.addEventListener("resize", checkIsDesktop);
        // Call handler right away so state gets updated with initial window size
        checkIsDesktop();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", checkIsDesktop);
    })


    const [isFull, setIsFull] = useState(false)

    const toggleFullScreen = (index) => {
        if (!isDesktop) {
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