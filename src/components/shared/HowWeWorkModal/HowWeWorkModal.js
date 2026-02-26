import React, {useEffect, useState} from 'react';
import s from './HowWeWorkModal.module.css'
import sMob from './HowWeWorkModalMob.module.css'
import {Modal} from "react-bootstrap";
import img1 from '@/static/img/imageLogoText.png'
import img2 from '@/static/img/Как мы работае-модалка.png'
import Image from "next/image";
import close from "@/static/img/crossWhite.svg";
import Link from "next/link";

import img1Page2Desktop from '@/static/img/image1Page2.png'
import img2Page2Desktop from '@/static/img/image2Page2.png'
import img3Page2Desktop from '@/static/img/image3Page2.png'
import img4Page2Desktop from '@/static/img/image4Page2.png'
import img1Page2Mob from '@/static/img/image1Page2Mob.png'
import img2Page2Mob from '@/static/img/image2Page2Mob.png'
import img3Page2Mob from '@/static/img/image3Page2Mob.png'
import img4Page2Mob from '@/static/img/image4Page2Mob.png'
import img1Page2DesktopManyLogos from '@/static/img/manyLogos1Page2.png'
import img2Page2DesktopManyLogos from '@/static/img/manyLogos2Page2.png'
import img3Page2DesktopManyLogos from '@/static/img/manyLogos3Page2.png'
import img4Page2DesktopManyLogos from '@/static/img/manyLogos4Page2.png'
import blob1 from '@/static/img/blob1.png'
import blob2 from '@/static/img/blob2.png'
import imgUs1 from '@/static/img/Как работаем 1.png'
import imgUs2 from '@/static/img/Как работаем 2.png'
import imgUs3 from '@/static/img/Гарантии 1.png'
import imgUs4 from '@/static/img/гарантии 2.png'
import imgUs5 from '@/static/img/Гарантии 3.png'
import imgUs6 from '@/static/img/Гарантии 4.png'
import imgUs7 from '@/static/img/Гарантии 5.png'
import imgUs8 from '@/static/img/Гарантии 6.png'
import imgUs9 from '@/static/img/Команда 1.png'
import imgUs10 from '@/static/img/Команда 2.png'
import imgUs11 from '@/static/img/Команда 3.png'
import imgUs12 from '@/static/img/Философия 1.png'
import imgUs13 from '@/static/img/Философия 2.png'
import imgUs14 from '@/static/img/Цели 1.png'
import imgUs15 from '@/static/img/Цели 2.png'
import imgUs1Mob from '@/static/img/Как работаем 1 mob.png'
import imgUs2Mob from '@/static/img/Как работаем 2 mob.png'
import imgUs3Mob from '@/static/img/Как работаем 3 mob.png'
import imgUs4Mob from '@/static/img/Гарантии 1 mob.png'
import imgUs5Mob from '@/static/img/Гарантии 2 mob.png'
import imgUs6Mob from '@/static/img/Гарантии 3 mob.png'
import imgUs7Mob from '@/static/img/Гарантии 4 mob.png'
import imgUs8Mob from '@/static/img/Гарантии 5 mob.png'
import imgUs9Mob from '@/static/img/Гарантии 6 mob.png'
import imgUs10Mob from '@/static/img/Гарантии 7 mob.png'
import imgUs11Mob from '@/static/img/Гарантии 8 mob.png'
import imgUs12Mob from '@/static/img/Команда 1 mob.png'
import imgUs13Mob from '@/static/img/Команда 2 mob.png'
import imgUs14Mob from '@/static/img/Команда 3 mob.png'
import imgUs15Mob from '@/static/img/Команда 4 mob.png'
import imgUs16Mob from '@/static/img/Философия 1 mob.png'
import imgUs17Mob from '@/static/img/Философия 2 mob.png'
import imgUs18Mob from '@/static/img/Философия 3 mob.png'
import imgUs19Mob from '@/static/img/Философия 4 mob.png'
import imgUs20Mob from '@/static/img/Философия 5 mob.png'
import imgUs21Mob from '@/static/img/Цели 1 mob.png'
import imgUs22Mob from '@/static/img/Цели 2 mob.png'

const HowWeWorkModal = ({show, onHide}) => {
    const [isDesktop, setIsDesktop] = useState(true)
    useEffect(() => {
        const width = window.innerWidth
        if (width <= 1000) {
            setIsDesktop(false)
        }
    }, [isDesktop])

    // const [isBlocksPage2Visible, setIsBlocksPage2Visible] = useState(false);
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setIsBlocksPage2Visible(true);
    //     }, 5000); // Время, соответствующее длительности анимации логотипа
    //
    //     return () => clearTimeout(timer);
    // }, []);

    return (<>
        {isDesktop ? (
            <Modal
                centered={true}
                show={show}
                onHide={onHide}
                contentClassName={s.modalContent}
                dialogClassName={s.modalCustom}
                backdropClassName={s.customBackdrop}
            >
                <Modal.Body style={{padding: 0, position: 'relative'}}>
                    <div className={s.close}>
                        <Image src={close} alt="" onClick={onHide} style={{cursor: 'pointer'}}/>
                    </div>
                    <div className={s.page1Wrapper}>
                        <div className={s.animation1Blob1}>
                            <Image
                                src={blob1}
                                alt="Logo Text"
                                width={100} // Ширина
                                height={150} // Высота будет автоматически рассчитана
                                layout="responsive" // Для правильной обработки пропорций
                            />
                        </div>
                        <div className={s.animation1Blob2}>
                            <Image
                                src={blob2}
                                alt="Logo Text"
                                width={100} // Ширина
                                height={150} // Высота будет автоматически рассчитана
                                layout="responsive" // Для правильной обработки пропорций
                            />
                        </div>
                        <div className={s.page2LogoImgContainer}>
                            <Image
                                src={img1}
                                alt="Logo Text"
                                className={s.animationImagePage2Logo} // Применяем класс анимации
                                width={100} // Ширина
                                height={150} // Высота будет автоматически рассчитана
                                layout="responsive" // Для правильной обработки пропорций
                            />
                        </div>
                        <div className={s.imageGridVisible}>
                            <div className={s.logos}>
                                <div className={s.logosSlide}>
                                    <Image
                                        src={img1Page2DesktopManyLogos}
                                        alt="Image 1"
                                        className={s.manyLogos}
                                        width={900} // Ширина
                                        height={150} // Высота будет автоматически рассчитана
                                        quality={100}
                                    />
                                    <Image
                                        src={img2Page2DesktopManyLogos}
                                        alt="Image 1"
                                        className={s.manyLogos}
                                        width={900} // Ширина
                                        height={150} // Высота будет автоматически рассчитана
                                        quality={100}
                                    />
                                    <Image
                                        src={img3Page2DesktopManyLogos}
                                        alt="Image 1"
                                        className={s.manyLogos}
                                        width={900} // Ширина
                                        height={150} // Высота будет автоматически рассчитана
                                        quality={100}
                                    />
                                    <Image
                                        src={img4Page2DesktopManyLogos}
                                        alt="Image 1"
                                        className={s.manyLogos}
                                        width={900} // Ширина
                                        height={150} // Высота будет автоматически рассчитана
                                        quality={100}
                                    />
                                </div>
                                <div className={s.logosSlide}>
                                    <Image
                                        src={img1Page2DesktopManyLogos}
                                        alt="Image 1"
                                        className={s.manyLogos}
                                        width={900} // Ширина
                                        height={150} // Высота будет автоматически рассчитана
                                        quality={100}
                                    />
                                    <Image
                                        src={img2Page2DesktopManyLogos}
                                        alt="Image 1"
                                        className={s.manyLogos}
                                        width={900} // Ширина
                                        height={150} // Высота будет автоматически рассчитана
                                        quality={100}
                                    />
                                    <Image
                                        src={img3Page2DesktopManyLogos}
                                        alt="Image 1"
                                        className={s.manyLogos}
                                        width={900} // Ширина
                                        height={150} // Высота будет автоматически рассчитана
                                        quality={100}
                                    />
                                    <Image
                                        src={img4Page2DesktopManyLogos}
                                        alt="Image 1"
                                        className={s.manyLogos}
                                        width={900} // Ширина
                                        height={150} // Высота будет автоматически рассчитана
                                        quality={100}
                                    />
                                </div>
                            </div>
                            <div className={s.imageGrid}>
                                <div
                                    className={`${s.imageBlock} ${s.imageBlock1}`}
                                    style={{width: '44%', position: 'relative'}}>
                                    <Image
                                        src={img1Page2Desktop}
                                        alt="Image 1"
                                        className={s.imagesPage2}
                                        style={{
                                            boxShadow: '0 0 0 1px transparent, 0 0 0 1px rgba(224, 224, 224, 0.59)', // Пустая рамка и градиентная рамка
                                            borderRadius: '5px', // Радиус рамки
                                            position: 'relative',
                                            zIndex: 2,
                                            backgroundColor: 'rgba(36, 36, 36, 0.35)', // Фон
                                            backdropFilter: 'blur(10px)',
                                        }}
                                        width={600} // Ширина
                                        height={400} // Высота будет автоматически рассчитана
                                        layout="responsive" // Для правильной обработки пропорций
                                    />
                                </div>
                                <div
                                    className={`${s.imageBlock} ${s.imageBlock2}`}
                                    style={{width: '34%', position: 'relative'}}>
                                    <Image
                                        src={img2Page2Desktop}
                                        alt="Image 2"
                                        className={s.imagesPage2}
                                        style={{
                                            boxShadow: '0 0 0 1px transparent, 0 0 0 1px rgba(224, 224, 224, 0.59)', // Пустая рамка и градиентная рамка
                                            borderRadius: '5px', // Радиус рамки
                                            position: 'relative',
                                            zIndex: 2,
                                            backgroundColor: 'rgba(36, 36, 36, 0.35)', // Фон
                                            backdropFilter: 'blur(10px)',
                                        }}
                                        width={500} // Ширина
                                        height={300} // Высота будет автоматически рассчитана
                                        layout="responsive" // Для правильной обработки пропорций
                                    />
                                </div>
                                <div className={s.imageColumn} style={{width: '20%'}}>
                                    <div
                                        className={`${s.imageBlock} ${s.imageBlock3}`}>
                                        <Image
                                            src={img3Page2Desktop}
                                            alt="Image 3"
                                            className={s.imagesPage2}
                                            width={285} // Ширина
                                            height={214} // Высота будет автоматически рассчитана
                                            layout="responsive" // Для правильной обработки пропорций
                                        />
                                    </div>
                                    <div
                                        className={`${s.imageBlock} ${s.imageBlock4}`}>
                                        <Image
                                            src={img4Page2Desktop}
                                            alt="Image 4"
                                            className={s.imagesPage2}
                                            width={285} // Ширина
                                            height={54} // Высота будет автоматически рассчитана
                                            layout="responsive" // Для правильной обработки пропорций
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className={s.page2Wrapper}>
                        <div className={s.page2}>
                            <Image src={imgUs1} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs2} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs3} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs4} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs5} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs6} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs7} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs8} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs9} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs10} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs11} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs12} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs13} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs14} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs15} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        ) : (
            <Modal
                centered={true}
                fullscreen={true}
                show={show}
                onHide={onHide}
                contentClassName={sMob.modalContent}
            >
                <Modal.Body style={{padding: 0, position: 'relative', overflowX: 'hidden'}}>
                    <div className={sMob.close}>
                        <Image src={close} alt="" onClick={onHide} style={{cursor: 'pointer'}}/>
                    </div>
                    <div className={sMob.page1Wrapper}>
                        <div className={sMob.animation1Blob1}>
                            <Image
                                src={blob1}
                                alt="Logo Text"
                                width={100} // Ширина
                                height={150} // Высота будет автоматически рассчитана
                                layout="responsive" // Для правильной обработки пропорций
                            />
                        </div>
                        <div className={sMob.animation1Blob2}>
                            <Image
                                src={blob2}
                                alt="Logo Text"
                                width={100} // Ширина
                                height={150} // Высота будет автоматически рассчитана
                                layout="responsive" // Для правильной обработки пропорций
                            />
                        </div>
                        <div className={sMob.page2LogoImgContainer}>
                            <Image
                                src={img1}
                                alt="Logo Text"
                                className={sMob.animationImagePage2Logo} // Применяем класс анимации
                                width={100} // Ширина
                                height={150} // Высота будет автоматически рассчитана
                                layout="responsive" // Для правильной обработки пропорций
                            />
                        </div>
                        <div className={sMob.image1grid}>
                            <Image
                                src={img1Page2Mob}
                                alt="Image 1"
                                className={sMob.imagesPage2}
                                style={{
                                    boxShadow: '0 0 0 1px transparent, 0 0 0 1px rgba(224, 224, 224, 0.59)', // Пустая рамка и градиентная рамка
                                    borderRadius: '5px', // Радиус рамки
                                    position: 'relative',
                                    zIndex: 2,
                                    backgroundColor: 'rgba(36, 36, 36, 0.35)', // Фон
                                    backdropFilter: 'blur(10px)',
                                    objectFit: 'contain'
                                }}
                                width={600} // Ширина
                                height={400} // Высота будет автоматически рассчитана
                                layout="responsive" // Для правильной обработки пропорций
                            />
                        </div>
                        <div className={sMob.scrollImagesPage2}>
                            <div className={sMob.logosSlide}>
                                <Image
                                    src={img1Page2DesktopManyLogos}
                                    alt="Image 1"
                                    className={sMob.manyLogos}
                                    width={900} // Ширина
                                    height={150} // Высота будет автоматически рассчитана
                                    quality={100}
                                />
                                <Image
                                    src={img2Page2DesktopManyLogos}
                                    alt="Image 1"
                                    className={sMob.manyLogos}
                                    width={900} // Ширина
                                    height={150} // Высота будет автоматически рассчитана
                                    quality={100}
                                />
                                <Image
                                    src={img3Page2DesktopManyLogos}
                                    alt="Image 1"
                                    className={sMob.manyLogos}
                                    width={900} // Ширина
                                    height={150} // Высота будет автоматически рассчитана
                                    quality={100}
                                />
                                <Image
                                    src={img4Page2DesktopManyLogos}
                                    alt="Image 1"
                                    className={sMob.manyLogos}
                                    width={900} // Ширина
                                    height={150} // Высота будет автоматически рассчитана
                                    quality={100}
                                />
                            </div>
                            <div className={sMob.logosSlide}>
                                <Image
                                    src={img1Page2DesktopManyLogos}
                                    alt="Image 1"
                                    className={sMob.manyLogos}
                                    width={900} // Ширина
                                    height={150} // Высота будет автоматически рассчитана
                                    quality={100}
                                />
                                <Image
                                    src={img2Page2DesktopManyLogos}
                                    alt="Image 1"
                                    className={sMob.manyLogos}
                                    width={900} // Ширина
                                    height={150} // Высота будет автоматически рассчитана
                                    quality={100}
                                />
                                <Image
                                    src={img3Page2DesktopManyLogos}
                                    alt="Image 1"
                                    className={sMob.manyLogos}
                                    width={900} // Ширина
                                    height={150} // Высота будет автоматически рассчитана
                                    quality={100}
                                />
                                <Image
                                    src={img4Page2DesktopManyLogos}
                                    alt="Image 1"
                                    className={sMob.manyLogos}
                                    width={900} // Ширина
                                    height={150} // Высота будет автоматически рассчитана
                                    quality={100}
                                />
                            </div>
                        </div>
                        <div className={sMob.page3Images}>
                            <div className={sMob.image234grid}>
                                <Image
                                    src={img2Page2Mob}
                                    alt="Image 1"
                                    className={sMob.imagesPage2}
                                    style={{
                                        boxShadow: '0 0 0 1px transparent, 0 0 0 1px rgba(224, 224, 224, 0.59)', // Пустая рамка и градиентная рамка
                                        borderRadius: '5px', // Радиус рамки
                                        position: 'relative',
                                        zIndex: 2,
                                        backgroundColor: 'rgba(36, 36, 36, 0.35)', // Фон
                                        backdropFilter: 'blur(10px)',
                                    }}
                                    width={600} // Ширина
                                    height={400} // Высота будет автоматически рассчитана
                                    layout="responsive" // Для правильной обработки пропорций
                                />
                            </div>
                            <div className={sMob.image234grid}>
                                <Image
                                    src={img3Page2Mob}
                                    alt="Image 1"
                                    className={sMob.imagesPage2}
                                    width={600} // Ширина
                                    height={400} // Высота будет автоматически рассчитана
                                    layout="responsive" // Для правильной обработки пропорций
                                />
                            </div>
                            <div className={sMob.image234grid}>
                                <Image
                                    src={img4Page2Mob}
                                    alt="Image 1"
                                    className={sMob.imagesPage2}
                                    width={600} // Ширина
                                    height={400} // Высота будет автоматически рассчитана
                                    layout="responsive" // Для правильной обработки пропорций
                                />
                            </div>
                        </div>
                    </div>

                    <div className={s.page2Wrapper}>
                        <div className={s.page2}>
                            <Image src={imgUs1Mob} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs2Mob} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs3Mob} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs4Mob} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs5Mob} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs6Mob} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs7Mob} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs8Mob} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs9Mob} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs10Mob} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs11Mob} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs12Mob} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs13Mob} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs14Mob} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs15Mob} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs16Mob} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs17Mob} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs18Mob} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs19Mob} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs20Mob} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs21Mob} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs22Mob} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        )}
    </>);
};

export default HowWeWorkModal;