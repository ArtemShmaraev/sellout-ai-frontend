import React, {useContext} from 'react';
import s from './OrderAddress.module.css'
import CustomRadio from "@/components/shared/UI/CustomRadio/CustomRadio";
import AddressModal from "@/components/pages/account/AddressModal/AddressModal";
import {Context} from "@/context/AppWrapper";
import {observer} from "mobx-react-lite";

const OrderAddress = ({isPickup = false, checked, name, address, id}) => {
    const {orderStore} = useContext(Context)
    const selectAddress = () => {
        orderStore.setSelectedAddressId(id)
        orderStore.setShipType(1)
    }
    return (
        <div className={s.card}>
            <div className={s.col}>
                <div onClick={selectAddress}>
                    <CustomRadio checked={orderStore.selectedAddressId === id}
                                 label={isPickup ? 'Самовывоз' : name}
                                 normalLabel={true}
                    />
                </div>
                <div>{isPickup ? 'Ул 3-я Лесные поляны, д27/22' : address}</div>
            </div>
            <div className={s.icons_block}>
                <AddressModal addressId={id}/>
            </div>
        </div>
    );
};

export default observer(OrderAddress);