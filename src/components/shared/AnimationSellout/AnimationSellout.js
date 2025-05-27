import React from 'react';
import s from './AnimationSellout.module.css'
import img from '@/static/img/logo_white.png'
import Image from "next/image";

const AnimationSellout = () => {
    return (
        <div className={s.block}>
            <Image src={img} alt='' className={s.img}/>
        </div>
    );
};

export default AnimationSellout;