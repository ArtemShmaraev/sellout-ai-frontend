import React, {useContext, useEffect, useRef, useState} from 'react';
import Image from "next/image";
import s from './PictureBlock.module.css'
import parse from "html-react-parser";
import logo from "@/static/img/sellout_logo.svg";
import desktop from "@/static/img/desktop_background_old.jpg";
import mobile from "@/static/img/big_bg.jpg";
import Link from "next/link";
import {Context} from "@/context/AppWrapper";
import Arrow from "@/components/shared/UI/Arrow/Arrow";

const PictureBlock = ({obj, className, type}) => {
    const {desktopStore} = useContext(Context)
    const [moreOpen, setMoreOpen] = useState(false)
    const swiperRef = useRef(null); // Реф для Swiper

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


    const getDirection = () => {
        if (type === 'row_reverse') {
            return s.row_reverse
        }
        if (type === 'column_reverse') {
            return s.column_reverse
        }
        return s.row
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const [isLoading, setIsLoading] = useState(true)
    const genders = obj.gender
    const title = obj.title
    const subtitle = obj.subtitle
    const query = obj.q
    const lines = obj.line
    const categories = obj.category
    const collabs = obj.collab
    const collection = obj.collection
    const genderTransforms = {
        "M": "Мужское",
        "F": "Женское",
        "K": "Детское"
    }
    const genderTransforms2 = {
        "M": "Мужская",
        "F": "Женская",
        "K": "Детская"
    }
    const genderTransforms3 = {
        "M": "мужчин",
        "F": "женщин",
        "K": "детей"
    }

    const getGenderLine = (genders, photo = false, mix = false) => {
        if (!photo && !mix) {
            if (genders.length === 0 || genders.length === 3) {
                return "Женское, мужское и детское"
            } else if (genders.length === 1) {
                return genderTransforms[genders[0]]
            } else {
                return `${genderTransforms[genders[0]]} и ${genderTransforms[genders[1]]}`
            }
        } else if (photo && !mix) {
            if (genders.length === 0 || genders.length === 3) {
                return ["", "Женское, мужское и детское"]
            } else if (genders.length === 1) {
                return [`${genderTransforms2[genders[0]]} коллекция`, ""]
            } else {
                return ["", `${genderTransforms[genders[0]]} и ${genderTransforms[genders[1]]}`]
            }
        } else if (mix) {
            if (genders.length === 0 || genders.length === 3) {
                return [`${title}`, "Женское, мужское и детское"]
            } else if (genders.length === 1) {
                return [`${title}`, `${genderTransforms[genders[0]]}`]
            } else {
                return [`${title}`, `${genderTransforms[genders[0]]} и ${genderTransforms[genders[1]].toLowerCase()}`]
            }
        }
    }

    let firstLine;
    let secondLine;

    if (collection.length !== 0) {
        firstLine = title
        if (subtitle) {
            secondLine = parse(subtitle)
        } else {
            secondLine = getGenderLine(genders)
        }
    } else if (query) {
        firstLine = capitalizeFirstLetter(query)
        secondLine = getGenderLine(genders)
    } else if (obj.photo) {
        [firstLine, secondLine] = getGenderLine(genders, true)
    } else if (lines.length === 1 && categories.length !== 1) {
        if (genders.length === 1) {
            firstLine = `${genderTransforms2[genders[0]]} коллекция ${title}`
            secondLine = ""
        } else {
            firstLine = title
            secondLine = getGenderLine(genders)
        }
    } else if (!title) {
        firstLine = getGenderLine(genders)
        secondLine = ""
    } else {
        [firstLine, secondLine] = getGenderLine(genders, false, true)
    }

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
                                        <Image src={logo} alt='' className={s.logo} width={200} loading={"eager"}/>
                                        :
                                        <h3 className={'text-black'}>{obj.title}</h3>
                                    }
                                    {firstLine && (
                                        <div className={s.firstLinePhoto}>{firstLine}</div>
                                    )}
                                </div>
                                {obj.photo && (
                                    desktopStore.isDesktop ? (
                                        <div className={s.text}>
                                            {parse(obj.content)}
                                        </div>
                                    ) : (
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
                                    )
                                )}

                                {secondLine && (
                                    <div className={s.secondLinePhoto}>{secondLine}</div>
                                )}
                            </div>
                        </div>
                        {
                            obj.photo &&
                            <div className={s.img_block}>
                                <div className={s.img_cont}>
                                    <Image src={obj.photo} alt='' fill={true} className={s.img}
                                           onLoadingComplete={() => setIsLoading(false)} sizes={'100%'}
                                           loading={"eager"}
                                           />

                                    <Image src={desktop} alt=''
                                           className={`placeholder_img ${s.desktop}`} fill={true} sizes={'100%'}
                                           style={{
                                               opacity: isLoading ? 1 : 0,
                                           }}

                                    />
                                    <Image src={mobile} alt=''
                                           className={`placeholder_img ${s.mobile}`} fill={true} sizes={'100%'}
                                           style={{
                                               opacity: isLoading ? 1 : 0,
                                              }}
                                    />

                                </div>
                            </div>
                        }
                    </div>
                    :
                    <div className={`${className} ${s.texts}`}>
                        {firstLine && (
                            <div className={s.firstLine}>{firstLine}</div>
                        )}
                        {secondLine && (
                            <div className={s.secondLine}>{secondLine}</div>
                        )}
                    </div>
            }
        </>
    );
};

export default PictureBlock;