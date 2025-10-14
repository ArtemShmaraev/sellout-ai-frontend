import React, {useEffect, useState} from 'react';
import Image from "next/image";
import s from './FirstMainBlock.module.css'
import Link from "next/link";
import kylie from "/src/static/img/kylie.png"
import shoe from "/src/static/img/shoe.png"


const FirstMainBlock = ({obj}) => {
    const [isDesktop, setIsDesktop] = useState(true)
    useEffect(() => {
        const width = window.innerWidth
        if (width <= 1200) {
            setIsDesktop(false)
        }
    }, [])
    const [isLoading, setIsLoading] = useState(true)
    return (
        <div className={s.imageRow}>
            <div className={s.imageContainer}>
                <video
                    autoPlay muted loop
                    className={s.image}>
                    <source src={obj.leftSmallVideo} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className={s.imageContainer}>
                <video
                    autoPlay muted loop
                    className={s.image}>
                    <source src={obj.rightSmallVideo} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className={s.imageContainer}>
                <video
                    autoPlay muted loop
                    className={s.image}>
                    <source src={obj.bigVideo} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};

export default FirstMainBlock;