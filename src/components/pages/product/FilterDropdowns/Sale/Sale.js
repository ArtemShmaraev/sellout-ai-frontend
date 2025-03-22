import React from 'react';
import s from "./Sale.module.css";
import CustomCheckbox from "@/components/shared/UI/CustoCheckbox/CustomCheckbox";

const Sale = () => {
    return (
        <div className={s.sale + ' d-flex align-items-center'}>
            <CustomCheckbox
                labelText={'Скидка'}
                reversed={true}
                labelClass={s.text}
                spaceBetween={true}
            />
        </div>
    );
};

export default Sale;