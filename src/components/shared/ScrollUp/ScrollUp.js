import React, { useState, useEffect } from 'react';
import s from './ScrollUp.module.css'
import arrow from '@/static/icons/chevron-up.svg'
import Image from "next/image";
import cn from 'classnames';
import {desktopStore} from "@/store/DesktopStore";
import {useRouter} from "next/router"; // Импортируйте библиотеку 'classnames'

const ScrollUp = () => {
    const [visible, setVisible] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false); // отслеживание процесса скроллинга

    // Функция для проверки скроллинга
    const checkScroll = () => {
        const currentScrollPos = window.pageYOffset;

        // Определяем, видна ли кнопка: скролл вверх или позиция ниже определенного значения
        const showButton = prevScrollPos > currentScrollPos && desktopStore.navbarVisible && currentScrollPos > 100;

        setPrevScrollPos(currentScrollPos);
        setVisible(showButton);

        // Если пользователь остановился, запускаем таймер для скрытия кнопки через 3 секунды
        setIsScrolling(true);
        setTimeout(() => {
            setIsScrolling(false);
        }, 700); // Через 300ms после скроллинга
    };

    // Обработчик клика по кнопке для скролла наверх
    const click = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

        // Скрываем кнопку сразу после начала скролла
        setVisible(false);
    };

    // Отслеживаем скроллинг и скрытие кнопки при достижении верха
    useEffect(() => {
        const handleScroll = () => {
            checkScroll();

            // Скрываем кнопку, если пользователь находится вверху
            if (window.pageYOffset === 0) {
                setVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

    // Убираем кнопку через некоторое время после завершения скроллинга
    useEffect(() => {
        if (!isScrolling && visible) {
            const timer = setTimeout(() => {
                setVisible(false);
            }, 500); // Убираем кнопку через 3 секунды после завершения скроллинга

            return () => clearTimeout(timer);
        }
    }, [isScrolling, visible]);

    const router = useRouter();

    return (
        <div className={cn(s.scroll_btn, { [s.visible]: visible })} onClick={click} style={{bottom: `${router.pathname === '/' ? '40px' : ''}`}}>
            <Image width={25} src={arrow} alt='' className={s.icon}/>
        </div>
    );
};

export default ScrollUp;
