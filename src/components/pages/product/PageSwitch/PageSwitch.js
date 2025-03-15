import React, {useEffect, useState} from 'react';
import s from './PageSwitch.module.css'
import {Container} from "react-bootstrap";

const PageSwitch = () => {
    const [isDesktop, setIsDesktop] = useState(true)
    useEffect(() => {
        const width = window.innerWidth
        if (width <= 1000) {
            setIsDesktop(false)
        }
    }, [isDesktop])
    return (
        <Container className={s.container}>
            {isDesktop &&
                <div className='d-flex justify-content-between'>
                    <a className={s.previous} href=''>{'< Предыдущая'}</a>
                    <div className={s.page}>{'3 из 228'}</div>
                    <a className={s.next} href=''>{'Следующая >'}</a>
                </div>
            }
            {!isDesktop &&
                <div className='d-flex justify-content-center'>
                    <a className={s.next} href=''>{'< '}</a>
                    <div className={s.page}>{'3 из 228 '}</div>
                    <a className={s.next} href=''>{' >'}</a>
                </div>
            }
        </Container>
    );
};

export default PageSwitch;