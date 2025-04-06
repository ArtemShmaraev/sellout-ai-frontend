import React from 'react';
import s from './AddressCard.module.css'
import cross from '@/static/icons/x-lg.svg'
import Image from "next/image";
import AddressModal from "@/components/pages/account/AddressModal/AddressModal";

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
                <AddressModal newAddress={false}/>
            </div>
        </div>
    );
};

export default AddressCard;