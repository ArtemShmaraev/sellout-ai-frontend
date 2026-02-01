    import React, {useContext} from 'react';
import s from './OrderAddress.module.css'
import CustomRadio from "@/components/shared/UI/CustomRadio/CustomRadio";
import AddressModal from "@/components/pages/account/AddressModal/AddressModal";
import {Context} from "@/context/AppWrapper";
import {observer} from "mobx-react-lite";
import Cookies from "js-cookie";
import {fetchDeliveryInfo} from "@/http/orderApi";

const OrderAddress = ({isPickup = false, checked, name, address, id, isMain}) => {
    const {orderStore} = useContext(Context)
    const fetchDeliveryPrice = async () => {
        const obj = {}
        //По МСК
        if (orderStore.shipType === 3) {
            obj.delivery_type = 0
            obj.address_id = orderStore.selectedAddressId
        }
        //До двери
        if (orderStore.shipType === 1) {
            obj.delivery_type = 2
            obj.address_id = orderStore.selectedAddressId
        }
        //Boxberry
        if (orderStore.shipType === 2) {
            obj.delivery_type = 1
            obj.target = boxberryAddress.id
        }
        const token = Cookies.get('access_token')
        const data = await fetchDeliveryInfo(obj, token)
        orderStore.setDeliveryPrice(data)
    }
    const selectAddress = () => {
        orderStore.setSelectedAddressId(id)
        fetchDeliveryPrice()
    }
    return (
        <div className={s.card}>
            <div className={s.col}>
                <div className={s.address_name} onClick={selectAddress}>
                    <CustomRadio checked={orderStore.selectedAddressId === id}
                                 label={isPickup ? 'Самовывоз' : name}
                                 normalLabel={true}
                                 reversed={true}
                    />

                </div>
                <div className={s.address_text}>{isPickup ? 'Ул 3-я Лесные поляны, д27/22' : address}</div>

            </div>
            <div className={s.icons_block}>
                <AddressModal addressId={id} defName={name} defAddress={address} defMain={isMain}/>
            </div>
        </div>
    );
};

export default observer(OrderAddress);