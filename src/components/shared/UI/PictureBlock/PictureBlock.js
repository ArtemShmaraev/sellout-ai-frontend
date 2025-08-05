import React, {useEffect, useState} from 'react';
import Image from "next/image";
import s from './PictureBlock.module.css'
import parse from "html-react-parser";
import logo from "@/static/img/sellout_logo.svg";
import desktop from "@/static/img/desktop_background.jpg";
import mobile from "@/static/img/big_bg.jpg";
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
        <div className={`${className} ${s.main_block} ${getDirection()}`} style={obj.photo ? {} : {minHeight: 'fit-content'}}>
            <div className={s.text_block}>
                {/*<Image src={logo} alt='' className={s.logo} width={200}/>*/}
                <div className={s.text_cont}>
                    <div>
                        {obj.title === 'sellout'
                            ?
                            <Image src={logo} alt='' className={s.logo} width={200}/>
                            :
                            <h3 className={'text-black'}>{obj.title}</h3>
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
    );
};

export default PictureBlock;