import React, {useContext} from 'react';
import s from './AddressCard.module.css'
import cross from '@/static/icons/x-lg.svg'
import Image from "next/image";
import AddressModal from "@/components/pages/account/AddressModal/AddressModal";
import {deleteAddress} from "@/http/userApi";
import {Context} from "@/context/AppWrapper";
import {useRouter} from "next/router";
import Cookies from "js-cookie";

const AddressCard = ({name, address, id}) => {
    const {userStore} = useContext(Context)
    const router = useRouter()
    const removeAddress = async (e) => {
        e.preventDefault()
        const token = Cookies.get('access_token')
        const userId = userStore.id
        const response = await deleteAddress(token, userId, id)
        router.push('/account/addresses', undefined, {scroll: false})
        return response
    }
    return (
        <div className={s.card}>
            <div className={s.address_block}>
                <div className={s.text}>Название адреса: {name}</div>
                <div className={s.text}>{address}</div>
            </div>
            <div className={s.icons_block}>
                <Image src={cross} alt='' className={s.icon} onClick={e => removeAddress(e)}/>
                <AddressModal newAddress={false} addressId={id}/>
            </div>
        </div>
    );
};

export default AddressCard;