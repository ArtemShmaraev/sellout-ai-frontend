import React, {forwardRef, useContext, useEffect, useRef, useState} from 'react';
import Image from "next/image";
import s from './MainImgBlock.module.css'
import parse from 'html-react-parser'
import logo from '@/static/img/sellout_logo.svg'
import Link from "next/link";
import desktop from "@/static/img/desktop_background_old.jpg";
import mobile from "@/static/img/big_bg.jpg";
import {Context} from "@/context/AppWrapper";
import Arrow from "@/components/shared/UI/Arrow/Arrow";

const MainImgBlock = forwardRef(({obj, className, dataIndex="none"}, ref) => {
    const {desktopStore} = useContext(Context)

    const getDirection = () => {
        if (obj.type === 'right_photo') {
            return s.row_reverse
        }
        return s.row
    }
    const getAlign = () => {
        if (obj.type === 'right_photo') {
            return s.align_right
        }
        return s.align_left
    }
    const [isLoading, setIsLoading] = useState(true)

    const [moreOpen, setMoreOpen] = useState(false)

    const [contentHeight, setContentHeight] = useState('85px');

    const contentRef = useRef(null);
    useEffect(() => {
        if (contentRef.current) {
            setContentHeight( "85x");
            setContentHeight(moreOpen ? contentRef.current.scrollHeight + "px" : '85px');
            setTimeout(() => {
                setContentHeight(moreOpen ? contentRef.current.scrollHeight + "px" : '85px');
            }, 400)

        }
    }, [moreOpen]);

    const toggle_more_open = () => {
        if (moreOpen) {
            setMoreOpen(true)
        }
        setMoreOpen(!moreOpen)
    }

    return (
        <div className={`${className} ${s.main_block} ${getDirection()} ${s.margins}`} data-index={dataIndex} ref={ref}>
            <div className={s.text_block}>
                <div className={s.text_cont}>
                    <div>
                        {obj.title === 'sellout'
                            ?
                            <Image src={logo} alt='' className={s.logo} width={200} loading={"eager"}/>
                            :
                            <h3 className={'text-black'}>{obj.title}</h3>
                        }
                    </div>
                    {desktopStore.isDesktop &&
                        <div className={s.text}>
                            {parse(obj.content)}
                        </div>
                    }
                    {!desktopStore.isDesktop &&
                        <>
                            <div
                                ref={contentRef}
                                className={[s.text, moreOpen ? s.text_open : ""].join(" ")}
                                style={{maxHeight: contentHeight}}
                            >
                                {parse(obj.content)}
                            </div>
                            <div className='d-flex justify-content-center'>
                                <button
                                    className={s.more_btn}
                                    onClick={toggle_more_open}>
                                    <div className={s.more_text}>
                                        <Arrow isOpen={moreOpen}/>
                                    </div>
                                </button>
                            </div>
                        </>
                    }

                </div>
                <div className={`${s.btn_block} ${getAlign()}`}>
                    <Link className={s.btn}
                          href={`/products?${obj.url}`}
                    >{obj.button}</Link>
                </div>
            </div>
            <div className={s.img_block}>
                <div className={s.img_cont}>
                    <Image src={obj.photo} alt='' fill={true} loading={'lazy'} className={s.img}
                           onLoadingComplete={() => setIsLoading(false)} sizes={'100%'}
                    />

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
        </div>
    );
});

export default MainImgBlock;