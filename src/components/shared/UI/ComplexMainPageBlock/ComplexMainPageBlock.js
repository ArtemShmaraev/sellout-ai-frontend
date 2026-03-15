import React, {forwardRef, useContext, useEffect, useLayoutEffect, useState} from 'react';
import Image from "next/image";
import s from './ComplexMainPageBlock.module.css'
import Link from "next/link";
import kylie from "/src/static/img/kylie.png"
import shoe from "/src/static/img/shoe.png"
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import ScrollableBlock from "@/components/shared/UI/ScrollableBlock/ScrollableBlock";
import desktop from "@/static/img/desktop_background_old.jpg";
import mobile from "@/static/img/big_bg.jpg";
import {Context} from "@/context/AppWrapper";

const ComplexMainPageScroll = ({obj}) => {
    const scrollableBlockArr = []
    obj.products.forEach(product => {
        scrollableBlockArr.push(
            <ProductCard
                product={product}
                key={product.id}
                smallCard={true}
            />
        )
    })
    return (
        <div>
            <div className='d-flex justify-content-between align-items-center my-5'>
                <div className={s.selections_title_block}>
                    <h3 className={s.selections_title}>{obj.title}</h3>
                </div>
                <div>
                    <Link href={'/products?' + obj.url} className={s.selection_link}
                    >Все {obj.productsAmount} моделей</Link>
                </div>
            </div>
            <ScrollableBlock>
                {scrollableBlockArr}
            </ScrollableBlock>
        </div>
    )
}

const ComplexMainPageBlock = forwardRef(({obj, dataIndex="none"}, ref) => {
    // const [isDesktop, setIsDesktop] = useState(true)
    const {desktopStore} = useContext(Context)
    const [imageWidth, setImageWidth] = useState('100%');
    const [videoWidth, setVideoWidth] = useState('100%');
    const [productBlocksWidth, setProductBlocksWidth] = useState('100%');

    const checkIsDesktop = () => {

        setImageWidth(desktopStore.isDesktop ?
            (obj.imagesInRowAmount ? `calc((100% / ${obj.imagesInRowAmount}) - 0.5%)` : '100%') :
            '49%')
        setVideoWidth(desktopStore.isDesktop ?
            (obj.videosInRowAmount ? `calc((100% / ${obj.videosInRowAmount}) - 0.5%)` : '100%') :
            '49%')
        setProductBlocksWidth(desktopStore.isDesktop ?
            obj.productsBlocks ? `calc((100% / ${obj.productsBlocks.blocksAmount}) - 0.5%)` : '100%' :
            obj.productsBlocks.blocksAmount === 4 ? '49%' : '32%')
    }


    useLayoutEffect(() => {

        window.addEventListener('resize', checkIsDesktop);
        checkIsDesktop();


        // // Убираем обработчик события при размонтировании компонента
        return () => {
            window.removeEventListener('resize', checkIsDesktop);
        };
    }, [])


    const [isLoading, setIsLoading] = useState(true)

    const noMargin = obj.hasOwnProperty('noMargin') ? obj.noMargin : false;
    // const slidesInVideo = obj.hasOwnProperty('slidesInVideo') ? obj.slidesInVideo : 0;
    const slidesInVideo = obj.slidesInVideo;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slidesInVideo);
        }, 3000); // Change image every 2 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={s.outerContainer} data-index={dataIndex} ref={ref}>
            {obj.title && (
                <div className={s.blockTitle}>
                    {obj.title}
                </div>
            )}

            {obj.fullWidthImage && Object.keys(obj.fullWidthImage).length > 0 && (
                <>
                    <div>
                        <Link href={obj.fullWidthImage.url} class={s.imageLink}>
                            <img
                                src={desktopStore.isDesktop ? obj.fullWidthImage.desktop : obj.fullWidthImage.mobile}
                                alt="Image"
                                style={{width: '100%', marginTop: 70, borderRadius: 4}}
                            />
                        </Link>

                        {/*<img src={desktop} alt=''*/}
                        {/*       className={`placeholder_img ${s.desktop}`}*/}
                        {/*       style={isLoading ? {} : {opacity: 0}}*/}
                        {/*/>*/}
                        {/*<img src={mobile} alt=''*/}
                        {/*       className={`placeholder_img ${s.mobile}`}*/}
                        {/*       style={isLoading ? {} : {opacity: 0}}*/}
                        {/*/>*/}
                    </div>

                    {/*<div style={{width: '100%', position: 'relative'}}>*/}
                    {/*    <div style={{paddingBottom: '100%' /* 1:1 aspect ratio *!/}></div>*/}
                    {/*    <div style={{position: 'absolute', width: '100%', height: '100%'}}>*/}
                    {/*        <Image*/}
                    {/*            src={isDesktop ? obj.fullWidthImage.desktop : obj.fullWidthImage.mobile}*/}
                    {/*            alt="image"*/}
                    {/*            layout="fill"*/}
                    {/*            objectFit="contain" // Adjust as per your requirement (contain, cover, etc.)*/}
                    {/*            unoptimized*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <Link href={obj.fullWidthImage.url}>*/}
                    {/*        <img*/}
                    {/*            src={isDesktop ? obj.fullWidthImage.desktop : obj.fullWidthImage.mobile}*/}
                    {/*            alt="Image"*/}
                    {/*            style={isDesktop ? {width: '100%', marginTop: 70, borderRadius: 4} : {*/}
                    {/*                width: '100%',*/}
                    {/*                marginTop: 70,*/}
                    {/*                borderRadius: 4,*/}
                    {/*                display: "none"*/}
                    {/*            }}*/}
                    {/*        />*/}
                    {/*        <img*/}
                    {/*            src={isDesktop ? obj.fullWidthImage.desktop : obj.fullWidthImage.mobile}*/}
                    {/*            alt="Image"*/}
                    {/*            style={isDesktop ? {*/}
                    {/*                width: '100%',*/}
                    {/*                marginTop: 70,*/}
                    {/*                borderRadius: 4,*/}
                    {/*                display: "none"*/}
                    {/*            } : {width: '100%', marginTop: 70, borderRadius: 4}}*/}
                    {/*        />*/}
                    {/*    </Link>*/}
                    {/*</div>*/}
                </>

                // <div className={s.animation_container}>
                //     <img src={obj.fullWidthImage.mobile} alt="Image 1"/>
                // </div>
                // <div className={s.img_block}>
                //     <div className={s.img_cont}>
                //         <Image src={isDesktop ? obj.fullWidthImage.desktop : obj.fullWidthImage.mobile} alt=''
                //                fill={true} loading={'lazy'} className={s.img}
                //                sizes={'100%'} quality={100}
                //         />
                //     </div>
                // </div>
            )}

            {obj.imagesInRow && obj.imagesInRow.length > 0 && (
                <div className={`${s.margins}`}>
                    <div className={`${s.imageContainer}`}
                         style={noMargin ? desktopStore.isDesktop ? {marginTop: 10} : {marginTop: 0} : {}}>
                        {obj.imagesInRow.map((imageData, index) => (
                            <Link key={index} href={imageData.url} className={s.imageLink} style={{width: imageWidth}}>
                                <img
                                    src={desktopStore.isDesktop ? imageData.imageDesktop : imageData.imageMobile}
                                    alt={imageData.text}
                                    className={s.image}
                                    loading={"lazy"}
                                />
                                <div className={s.textContainer}>
                                    {imageData.title &&
                                        <p className={s.title}
                                           style={{textDecoration: "underline"}}>{imageData.title}</p>}
                                    {imageData.subTitle && <p className={s.subTitle}
                                                              style={imageData.title ? {} : {textDecoration: "underline"}}>{imageData.subTitle}</p>}
                                    {imageData.text && <p className={s.text}
                                                          style={imageData.title || imageData.subTitle ? {} : {textDecoration: "underline"}}>{imageData.text}</p>}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {obj.videosInRow && obj.videosInRow.length > 0 && (
                <div className={`${s.margins}`}>
                    <div className={s.imageContainer}>
                        {obj.videosInRow.map((imageData, index) => (
                            <Link key={index} href={imageData.url} className={s.imageLink} style={{width: videoWidth}}>
                                <div className={s.videoContainer}>
                                    {imageData.video.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Image ${index + 1}`}
                                            className={index === currentImageIndex ? s.active : ''}
                                        />
                                    ))}
                                </div>
                                <div className={s.textContainer}>
                                    {imageData.title &&
                                        <p className={s.title}
                                           style={{textDecoration: "underline"}}>{imageData.title}</p>}
                                    {imageData.subTitle && <p className={s.subTitle}>{imageData.subTitle}</p>}
                                    {imageData.text && <p className={s.text}
                                                          style={imageData.title ? {} : {textDecoration: "underline"}}>{imageData.text}</p>}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/*{obj.videosInRow && obj.videosInRow.length > 0 && (*/}
            {/*    <div className={s.imageContainer}>*/}
            {/*        {obj.videosInRow.map((imageData, index) => (*/}
            {/*            <Link key={index} href={imageData.url} className={s.imageLink} style={{width: videoWidth}}>*/}
            {/*                <video style={{borderRadius: 7}}*/}
            {/*                       autoPlay muted loop className={s.image}>*/}
            {/*                    <source src={imageData.video} type="video/mp4"/>*/}
            {/*                    Your browser does not support the video tag.*/}
            {/*                </video>*/}
            {/*                <div className={s.textContainer}>*/}
            {/*                    {imageData.title &&*/}
            {/*                        <p className={s.title} style={{textDecoration: "underline"}}>{imageData.title}</p>}*/}
            {/*                    {imageData.subTitle && <p className={s.subTitle}>{imageData.subTitle}</p>}*/}
            {/*                    {imageData.text && <p className={s.text}*/}
            {/*                                          style={imageData.title ? {} : {textDecoration: "underline"}}>{imageData.text}</p>}*/}
            {/*                </div>*/}
            {/*            </Link>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*)}*/}

            {obj.productsBlocks && Object.keys(obj.productsBlocks).length > 0 && (
                <div className={`${s.margins}`}>
                    <div className={s.productsImagesContainer}>
                        {obj.productsBlocks.blocks.map((imageData, index) => (
                            <Link key={index} href={imageData.url} className={s.imageLink}
                                  style={{width: productBlocksWidth}}>
                                <img
                                    src={imageData.image}
                                    alt={imageData.text}
                                    className={s.image}
                                />
                                <div className={s.textContainer}>
                                    {imageData.title &&
                                        <p className={`${s.subTitle} ${s.subTitleProds}`}
                                           style={{textAlign: "center"}}>{imageData.title}</p>}
                                    {imageData.text &&
                                        <p className={s.text} style={{textAlign: "center"}}>{imageData.text}</p>}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/*{obj.videoProductsBlock && (*/}
            {/*    <div className={s.container}>*/}
            {/*        <div className={s.videoContainer}>*/}
            {/*            <video*/}
            {/*                autoPlay muted loop*/}
            {/*                className={s.videoProductsBlock}>*/}
            {/*                <source src={obj.videoProductsBlock.video} type="video/mp4"/>*/}
            {/*                Your browser does not support the video tag.*/}
            {/*            </video>*/}
            {/*        </div>*/}
            {/*        <div className={s.smallPicturesContainer}>*/}
            {/*            {obj.videoProductsBlock.images.map((picture, index) => (*/}
            {/*                <img*/}
            {/*                    key={index}*/}
            {/*                    src={picture.image}*/}
            {/*                    alt={picture.title}*/}
            {/*                    className={s.smallPicture}*/}
            {/*                />*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}

            {obj.productsSelection && Object.keys(obj.productsSelection).length > 0 && (
                <div>
                    <ComplexMainPageScroll obj={obj.productsSelection}></ComplexMainPageScroll>
                </div>
            )}
        </div>
    );
});

export default ComplexMainPageBlock;