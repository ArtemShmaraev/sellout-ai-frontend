import React from 'react';
import icon from '@/static/icons/truck.svg'
import s from './FastShip.module.css'
import CustomCheckbox from "@/components/shared/UI/CustoCheckbox/CustomCheckbox";

const FastShip = () => {
    return (
        <div className={s.sale + ' d-flex align-items-center'}>
            <CustomCheckbox
                labelText={'Мгновенная доставка'}
                reversed={true}
                labelClass={s.text}
                imgSrc={icon}
            />
        </div>
    );
};

export default FastShip;