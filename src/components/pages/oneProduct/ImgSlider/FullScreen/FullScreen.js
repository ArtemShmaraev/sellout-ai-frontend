import React, {useEffect, useState} from 'react';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import s from './FullScreen.module.css'
import close from '@/static/icons/x-lg.svg'
import Image from "next/image";
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import 'swiper/css/zoom';

const FullScreen = ({ toggle, photos, initialIndex}) => {

    const galleryItems = photos.map((photo) => ({
        original: photo.url,
        description: `Photo ${photo.id}`
    }));

    return (
        <div className={s.fullscreen} >
            <div className={s.quater} onClick={toggle}>

            </div>

            <div className={s.cont}>
                <div className={s.closeBtnWrapper}>
                    <button className={s.close_btn} onClick={toggle}>
                        <Image src={close} alt={''} />
                    </button>
                </div>
                <Gallery
                    items={galleryItems}
                    showNav={false}
                    slideDuration={200}
                    showPlayButton={false}
                    showFullscreenButton={false}
                    showThumbnails={false}
                    // isRTL={true}
                    startIndex={initialIndex
                    }
                    useBrowserFullscreen={false}
                    renderItem={(item) => (
                        <div className="image-gallery-image">
                            {/*<Image*/}
                            {/*    src={item.original}*/}
                            {/*    alt={item.description}*/}
                            {/*    loading={'eager'}*/}
                            {/*    style={{ width: '100vw', height: 'auto', objectFit: 'contain' }}*/}
                            {/*    width={'1000'}*/}
                            {/*    height={'1000'}*/}

                            {/*/>*/}
                            <img
                                loading={"lazy"}
                                src={item.original}
                                alt={item.description}
                                draggable={false}
                                style={{ maxWidth: '100%', height: 'auto', maxHeight: '50vh'}}
                            />
                        </div>
                    )}
                />
            </div>
            <div className={s.quater} onClick={toggle}>

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