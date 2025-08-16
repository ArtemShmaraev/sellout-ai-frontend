import React, {useEffect, useState} from 'react';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
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
    const galleryItems = photos.map((photo) => ({
        original: photo.url,
        description: `Photo ${photo.id}`
    }));

    return (
        <div className={s.fullscreen}>
            <div className={'d-flex justify-content-end'}>
                <button className={s.close_btn}
                        onClick={toggle}
                >
                    <Image src={close} alt={''}
                    /></button>
            </div>
            <div className={s.cont}>
                <Gallery
                    items={galleryItems}
                    showNav={false}
                    slideDuration={200}
                    showPlayButton={false}
                    showFullscreenButton={false}
                    showThumbnails={false}
                    // useBrowserFullscreen={false}
                    renderItem={(item) => (
                        <div className="image-gallery-image">
                            <img
                                src={item.original}
                                alt={item.description}
                                draggable={false}

                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                        </div>
                    )}
                />
            </div>
        </div>
    );
};


export default FullScreen;


// const FullScreen = ({toggle, photos}) => {
//     return (
//         <div className={s.fullscreen}>
//             <div className={'d-flex justify-content-end'}>
//                 <button className={s.close_btn}
//                         onClick={toggle}
//                 >
//                     <Image src={close} alt={''}
//                     />
//                 </button>
//             </div>
//
//             <div>
//
//                 <Swiper
//                     modules={[Navigation, Pagination, Scrollbar, A11y, Zoom]}
//                     spaceBetween={100}
//                     zoom={true}
//                     loop={true}
//                     pagination={{clickable: true}}
//                     // scrollbar={{ draggable: true }}
//                     // modules={[Pagination, Zoom]}
//                     className={s.cont}
//                     style={{
//                         "--swiper-pagination-color": "#000",
//                         "--swiper-navigation-color": "#000",
//                         "--swiper-navigation-size": "30px"
//                     }}
//                 >
//                     {photos.map(el =>
//                         <SwiperSlide className={s.photo}>
//                             <div className={[s.photo_cont, 'swiper-zoom-container'].join(' ')}>
//                                 <Image src={el.url}
//                                        alt={``}
//                                        fill={true}
//                                        loading={'eager'}
//                                        className={s.photo}
//                                 />
//                             </div>
//                         </SwiperSlide>
//                     )
//                     }
//                 </Swiper>
//             </div>
//         </div>
// );
// };

// export default FullScreen;