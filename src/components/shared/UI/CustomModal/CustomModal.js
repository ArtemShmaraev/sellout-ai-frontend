import React from 'react';
import s from './CustomModal.module.css'
import cross from '@/static/icons/x-lg.svg'
import Image from "next/image";

const CustomModal = ({show, onHide}) => {
    return (
        show &&
        <div className={s.modal}>
            <div className={'d-flex justify-content-end'}>
                <Image src={cross} alt='' onClick={onHide}/>
            </div>
            хуй
        </div>
    );
};

export default CustomModal;