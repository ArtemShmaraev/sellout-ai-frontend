import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import s from './AnimationSellout.module.css';
import Image from 'next/image';
import Cookies from 'js-cookie';
import img from '@/static/img/logo_white.png';
import { Context } from '@/context/AppWrapper';

const AnimationSellout = () => {
    // const [showAnimation, setShowAnimation] = useState(true);

    // useLayoutEffect(() => {
    //
    //     const lastAnimationTime = Cookies.get('lastAnimationTime');
    //     console.log(lastAnimationTime)
    //
    //
    //     // Если куки 'lastAnimationTime' не существует или равно "false", то показываем анимацию
    //     if (!lastAnimationTime || lastAnimationTime === 'false') {
    //         setShowAnimation(true);
    //         console.log('cerfffffffffff')
    //
    //         // Сохраняем текущее время в куки
    //         Cookies.set('lastAnimationTime', 'tr', { expires: 1 / 144 }); // 1 / 144 соответствует 10 минутам
    //     } else {
    //         setShowAnimation(false);
    //     }
    // }, []);

    return  (
        <div className={s.block}>
            <Image src={img} alt="" className={s.img} />
        </div>
    );
};

export default AnimationSellout;
