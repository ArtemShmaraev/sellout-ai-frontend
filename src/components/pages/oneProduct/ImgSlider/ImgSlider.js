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
                <FullScreen toggle={toggleFullScreen} photos={photos}/>
            }
        </>
    );
};

export default ImgSlider;