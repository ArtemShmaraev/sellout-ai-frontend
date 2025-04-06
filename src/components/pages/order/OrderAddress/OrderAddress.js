import React from 'react';
import s from './OrderAddress.module.css'
import CustomRadio from "@/components/shared/UI/CustomRadio/CustomRadio";
import AddressModal from "@/components/pages/account/AddressModal/AddressModal";

const OrderAddress = ({isPickup = false, checked}) => {
    return (
        <div className={s.card}>
            <div className={s.col}>
                <CustomRadio checked={checked}
                             label={isPickup ? 'Самовывоз' : 'Ffadfasf'}
                             normalLabel={true}
                />
                <div>{isPickup ? 'Ул 3-я Лесные поляны, д27/22' : 'dadasd'}</div>
                <div>{isPickup ? '88005553535' : 'adasdasd'}</div>
            </div>
            <div className={s.icons_block}>
                <AddressModal/>
            </div>
        </div>
    );
};

export default OrderAddress;