import React from 'react';
import icon from '@/static/icons/truck.svg'
import s from './FastShip.module.css'
import CustomCheckbox from "@/components/shared/UI/CustoCheckbox/CustomCheckbox";

const FastShip = () => {
    return (
        <div className={s.sale}>
            <CustomCheckbox
                labelText={'Мгновенная доставка'}
                reversed={true}
                labelClass={s.text}
                imgSrc={icon}
                spaceBetween={true}
            />
        </div>
    );
};

export default FastShip;