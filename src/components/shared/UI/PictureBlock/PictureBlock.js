import React, {useEffect, useState} from 'react';
import Image from "next/image";
import s from './PictureBlock.module.css'
import parse from "html-react-parser";
import logo from "@/static/img/sellout_logo.svg";
import desktop from "@/static/img/desktop_background.svg";
import mobile from "@/static/img/big_bg.svg";
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
        <div className={`${className} ${s.main_block} ${getDirection()}`}>
            <div className={s.text_block}>
                {/*<Image src={logo} alt='' className={s.logo} width={200}/>*/}
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
            </div>
            <div className={s.img_block}>
                <div className={s.img_cont}>
                    <Image src={obj.photo} alt='' fill={true} className={s.img} onLoadingComplete={() => setIsLoading(false)}/>
                    <Image src={isDesktop ? desktop : mobile} alt=''
                           className={'placeholder_img'} fill={true}
                           style={isLoading ? {} : {opacity: 0}}
                    />
                </div>
            </div>
        </div>
    );
};

export default PictureBlock;