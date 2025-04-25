import React from 'react';
import Image from "next/image";
import s from './PictureBlock.module.css'
import logo from '@/static/img/sellout_logo.svg'
import nb from '@/static/img/green.png'
const PictureBlock = () => {
    return (
        <div className={s.main_block}>
            <div className={s.text_block}>
                <Image src={logo} alt='' className={s.logo} width={200}/>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid a
                    nimi architecto asperiores blanditiis consequuntur corporis deleniti, dol
                </div>
            </div>
            <div className={s.img_block}>
                <div className={s.img_cont}>
                    <Image src={nb} alt='' fill={true} className={s.img}/>
                </div>
            </div>
        </div>
    );
};

export default PictureBlock;