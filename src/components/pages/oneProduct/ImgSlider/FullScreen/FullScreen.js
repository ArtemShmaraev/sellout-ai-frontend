import React from 'react';
import s from './FullScreen.module.css'
import close from '@/static/icons/x-lg.svg'
import Image from "next/image";
import ImageGallery from "react-image-gallery";
import {Navigation, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";

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
                    loop={true}
                    // pagination={{
                    //     type: 'progressbar',
                    // }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className={s.cont}
                    style={{
                        "--swiper-pagination-color": "#000",
                        "--swiper-navigation-color": "#000",
                        "--swiper-navigation-size": "30px"
                    }}
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
            </div>
        </div>
    );
};

export default FullScreen;