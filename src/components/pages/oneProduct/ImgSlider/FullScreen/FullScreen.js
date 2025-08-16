import React, {useEffect, useState} from 'react';
import s from './FullScreen.module.css'
import close from '@/static/icons/x-lg.svg'
import Image from "next/image";
import {Navigation, Pagination, Scrollbar, A11y, Zoom} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/zoom';

const FullScreen = ({toggle, photos}) => {
    return (
        <div className={s.fullscreen}>
            <div className={'d-flex justify-content-end'}>
                <button className={s.close_btn}
                        onClick={toggle}
                >
                    <Image src={close} alt={''}
                    />
                </button>
            </div>

            <div>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y, Zoom]}
                    spaceBetween={100}
                    zoom={true}
                    loop={true}
                    pagination={{clickable: true}}
                    // scrollbar={{ draggable: true }}
                    // modules={[Pagination, Zoom]}
                    className={s.cont}
                    style={{
                        "--swiper-pagination-color": "#000",
                        "--swiper-navigation-color": "#000",
                        "--swiper-navigation-size": "30px"
                    }}
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
            </div>
        </div>
    );
};

export default FullScreen;