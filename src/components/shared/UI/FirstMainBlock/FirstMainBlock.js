import React, {useContext, useEffect, useState} from 'react';
import Image from 'next/image';
import s from './FirstMainBlock.module.css'
import Link from 'next/link';
import {Context} from "@/context/AppWrapper";
// import img1 from '/src/static/img/image 896.jpg'
// import img2 from '/src/static/img/image 889.jpg'
// import img3 from '/src/static/img/image 897.jpg'


const FirstMainBlock = ({obj}) => {
    const {desktopStore} = useContext(Context)


    const leftImages = obj.leftImages
    const rightImages = obj.rightImages
    const bigImage = obj.bigImage
    const bigImageT = "https://sellout.su/sellout-photos/MainPage/Frame%208.png"

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
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