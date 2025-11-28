import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import s from './FirstMainBlock.module.css'
import Link from 'next/link';
// import img1 from '/src/static/img/image 896.jpg'
// import img2 from '/src/static/img/image 889.jpg'
// import img3 from '/src/static/img/image 897.jpg'


const FirstMainBlock = ({obj}) => {
    const [isDesktop, setIsDesktop] = useState(true)
    useEffect(() => {
        const width = window.innerWidth
        if (width <= 1200) {
            setIsDesktop(false)
        }
    }, [])

    const leftImages = obj.leftImages
    const rightImages = obj.rightImages
    const bigImage = obj.bigVideo
    const bigImageTemp = "https://sellout.su/sellout-photos/MainPage/Frame%205.png"

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        "https://sellout.su/sellout-photos/MainPage/Left.jpg",
        "https://sellout.su/sellout-photos/MainPage/Right.jpg",
        "https://sellout.su/sellout-photos/MainPage/image%20394.jpg",
        "https://sellout.su/sellout-photos/MainPage/image%20413.jpg",
        "https://sellout.su/sellout-photos/MainPage/image%20415.jpg",
        "https://sellout.su/sellout-photos/MainPage/image%20416.jpg",
        "https://sellout.su/sellout-photos/MainPage/image%20417.jpg",
        "https://sellout.su/sellout-photos/MainPage/image%20419.jpg",
        "https://sellout.su/sellout-photos/MainPage/image%20395.jpg",
        "https://sellout.su/sellout-photos/MainPage/image%20418.jpg",
        "https://sellout.su/sellout-photos/MainPage/image%20414.jpg",
        "https://sellout.su/sellout-photos/MainPage/image%20398.jpg"
    ];
    const images2 = [
        "https://sellout.su/sellout-photos/MainPage/image%20404.jpg",
        "https://sellout.su/sellout-photos/MainPage/image%20403.jpg",
        "https://sellout.su/sellout-photos/MainPage/image%20399.jpg",
        "https://sellout.su/sellout-photos/MainPage/image%20402.jpg",
        "https://sellout.su/sellout-photos/MainPage/image%20406.jpg",
        "https://sellout.su/sellout-photos/MainPage/image%20401.jpg",
        "https://sellout.su/sellout-photos/MainPage/image%20409.jpg",
        "https://sellout.su/sellout-photos/MainPage/image%20407.jpg",
        "https://sellout.su/sellout-photos/MainPage/image%20412.jpg",
        "https://sellout.su/sellout-photos/MainPage/image%20411.jpg",
        "https://sellout.su/sellout-photos/MainPage/image%20405.jpg",
        "https://sellout.su/sellout-photos/MainPage/image%20408.jpg"
    ];
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % leftImages.length);
        }, 1500); // Change image every 2 seconds

        return () => clearInterval(interval);
    }, []);
    return (

        // <div className={s.bigImageContainer}>
        //     <img
        //         src={bigImageTemp}
        //         alt={`Image`}
        //         className={s.bigImage}
        //     />
        // </div>
        <div className={s.imageRow}>
            <div className={s.imageContainer}>
                {leftImages.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Image ${index + 1}`}
                        className={index === currentImageIndex ? s.active : ''}
                    />
                ))}
            </div>
            <div className={s.imageContainer}>
                {rightImages.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Image ${index + 1}`}
                        className={index === currentImageIndex ? s.active : ''}
                    />
                ))}
            </div>
            <div className={s.container}>
                <div className={s.imageBigContainer}>
                    <img src={bigImage} alt="Scrolling Image" className={s.image} />
                </div>
            </div>
        </div>
    );
};

export default FirstMainBlock;