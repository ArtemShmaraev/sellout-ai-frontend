import React from 'react';
import s from './AddressCard.module.css'
import cross from '@/static/icons/x-lg.svg'
import edit from '@/static/icons/pencil-square.svg'
import Image from "next/image";

const AddressCard = () => {
    return (
        <div className={s.card}>
            <div className={s.address_block}>
                <div className={s.text}>Название адреса:</div>
                <div className={s.text}>Улица болтушкина дом колотушкина</div>
                <div className={s.text}>Телефон: </div>
            </div>
            <div className={s.icons_block}>
                <Image src={cross} alt='' className={s.icon}/>
                <Image src={edit} alt='' className={s.icon}/>
            </div>
        </div>
    );
};

export default AddressCard;