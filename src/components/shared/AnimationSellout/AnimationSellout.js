import React, {useEffect, useLayoutEffect} from 'react';
import s from './AnimationSellout.module.css'
import img from '@/static/img/logo_white.png'
import Image from "next/image";

const AnimationSellout = () => {

    useLayoutEffect(() => {
        console.log("Сxxxxейчас будет анимация")

    }, [])
    return (
        <div className={s.block}>
            <Image src={img} alt='' className={s.img}/>
        </div>
    );
};

export default AnimationSellout;