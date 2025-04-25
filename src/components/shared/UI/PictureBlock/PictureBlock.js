import React from 'react';
import Image from "next/image";
import s from './PictureBlock.module.css'
const PictureBlock = ({obj, type}) => {
    const getDirection = () => {
        if (type === 'row_reverse') {
            return s.row_reverse
        }
        if (type === 'column_reverse') {
            return s.column_reverse
        }
        return s.row
    }
    return (
        <div className={`${s.main_block} ${getDirection()}`}>
            <div className={s.text_block}>
                {/*<Image src={logo} alt='' className={s.logo} width={200}/>*/}
                <div className={s.text_cont}>
                    <div>
                        <h3>{obj.title}</h3>
                    </div>
                    <div>
                        {obj.content}
                    </div>
                </div>
            </div>
            <div className={s.img_block}>
                <div className={s.img_cont}>
                    <Image src={obj.photo} alt='' fill={true} className={s.img}/>
                </div>
            </div>
        </div>
    );
};

export default PictureBlock;