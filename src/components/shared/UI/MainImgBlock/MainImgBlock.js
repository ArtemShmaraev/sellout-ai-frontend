import React, {useEffect, useState} from 'react';
import Image from "next/image";
import s from './MainImgBlock.module.css'
import parse from 'html-react-parser'
import logo from '@/static/img/sellout_logo.svg'
import {useRouter} from "next/router";
const MainImgBlock = ({obj, className}) => {
    const router = useRouter()
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

    return (
        <div className={`${className} ${s.main_block} ${getDirection()}`}>
            <div className={s.text_block}>
                <div className={s.text_cont}>
                    <div>
                        {obj.title === 'sellout'
                            ?
                            <Image src={logo} alt='' className={s.logo} width={200}/>
                            :
                            <h3>{obj.title}</h3>
                        }
                    </div>
                    <div className={s.text}>
                        {parse(obj.content)}
                    </div>
                </div>
                <div className={`${s.btn_block} ${getAlign()}`}>
                    <a className={s.btn}
                       href={`/products?${obj.url}`}
                       onClick={(e) => {
                           e.preventDefault()
                           router.push(`/products?${obj.url}`)
                       }}
                    >Посмотреть все</a>
                </div>
            </div>
            <div className={s.img_block}>
                <div className={s.img_cont}>
                    <Image src={obj.photo} alt='' fill={true} loading={'eager'} className={s.img}/>
                </div>
            </div>
        </div>
    );
};

export default MainImgBlock;