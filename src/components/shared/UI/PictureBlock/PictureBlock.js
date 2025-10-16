import React, {useEffect, useState} from 'react';
import Image from "next/image";
import s from './PictureBlock.module.css'
import parse from "html-react-parser";
import logo from "@/static/img/sellout_logo.svg";
import desktop from "@/static/img/desktop_background.jpg";
import mobile from "@/static/img/big_bg.jpg";
import Link from "next/link";

const PictureBlock = ({obj, className, type}) => {
    const [isDesktop, setIsDesktop] = useState(true)
    useEffect(() => {
        const width = window.innerWidth
        if (width <= 1200) {
            setIsDesktop(false)
        }
    }, [])
    const getDirection = () => {
        if (type === 'row_reverse') {
            return s.row_reverse
        }
        if (type === 'column_reverse') {
            return s.column_reverse
        }
        return s.row
    }
    const [isLoading, setIsLoading] = useState(true)
    return (
        <>
            {
                obj.photo
                    ?
                    <div className={`${className} ${s.main_block} ${getDirection()}`}>
                        <div className={s.text_block}>
                            {/*<Image src={logo} alt='' className={s.logo} width={200}/>*/}
                            <div className={s.text_cont}>
                                <div>
                                    {obj.title_with_gender === 'sellout'
                                        ?
                                        <Image src={logo} alt='' className={s.logo} width={200}/>
                                        :
                                        <h3 className={'text-black'}>{obj.title_with_gender}</h3>
                                    }
                                </div>
                                {obj.photo &&
                                    <div className={s.text}>
                                        {parse(obj.content)}
                                    </div>
                                }
                            </div>
                        </div>
                        {
                            obj.photo &&
                            <div className={s.img_block}>
                                <div className={s.img_cont}>
                                    <Image src={obj.photo} alt='' fill={true} className={s.img}
                                           onLoadingComplete={() => setIsLoading(false)} sizes={'100%'}/>


                                    <Image src={desktop} alt=''
                                           className={`placeholder_img ${s.desktop}`} fill={true} sizes={'100%'}
                                           style={isLoading ? {} : {opacity: 0}}
                                    />
                                    <Image src={mobile} alt=''
                                           className={`placeholder_img ${s.mobile}`} fill={true} sizes={'100%'}
                                           style={isLoading ? {} : {opacity: 0}}
                                    />
                                </div>
                            </div>
                        }
                    </div>
                    :
                    <>
                        <h3 className={['text-black', className, s.single_text].join(' ')}>{obj.title_with_gender}</h3>
                        {
                            obj.subTitle
                                ?
                                <div className={s.desktop}>
                                    obj.subTitle
                                </div>
                                :
                                <div className={className}>
                                    Цвет Peach Fuzz отражает наше желание заботиться о себе и других. Это бархатистый нежный персиковый тон, всеобъемлющий дух которого обогащает разум, тело и душу. В поисках дома, который отражал бы наше врожденное стремление к близости и единству, Pantone выбрали цвет, излучающий тепло и современную элегантность. Оттенок, который вызывает сочувствие, предлагает тактильные объятия и без усилий соединяет молодость с вневременным.
                                    Больше товаров на весну смотрите в <Link href={'/products?category=winter_sneakers_and_shoes'} style={{color: "black"}}>теплых кроссовок</Link>, <Link href={'/products?category=knitwear'} style={{color: "black"}}>свитерах</Link>, <Link href={'/products?category=hoodie_sweatshirts'} style={{color: "black"}}>худи</Link> и <Link href={'/products?category=windbreakers'} style={{color: "black"}}>ветровках</Link>
                                </div>
                        }
                    </>


            }
        </>
    );
};

export default PictureBlock;