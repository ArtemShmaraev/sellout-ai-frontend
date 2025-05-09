import React, {useContext} from 'react';
import s from './AddressCard.module.css'
import cross from '@/static/icons/x-lg.svg'
import Image from "next/image";
import AddressModal from "@/components/pages/account/AddressModal/AddressModal";
import {deleteAddress, editAddress} from "@/http/userApi";
import {Context} from "@/context/AppWrapper";
import {useRouter} from "next/router";
import Cookies from "js-cookie";

const AddressCard = ({name, address, id, is_main}) => {
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
    const makeMain = async (e) => {
        e.preventDefault()
        const obj = {
            is_main: true
        }
        const token = Cookies.get('access_token')
        const userId = userStore.id
        const response = await editAddress(token, userId, id, JSON.stringify(obj))
        const {pathname, query} = router
        router.push({pathname, query}, undefined, {scroll: false})
        return response
    }
    return (
        <div className={s.card}>
            <div className={s.address_block}>
                <div className={s.text}>Название адреса: {name}</div>
                <div className={s.text}>{address}</div>
                {
                    is_main
                    ?
                        <div className={s.main_address}>Основной адрес</div>
                        :
                        <div className={s.main_address}
                             style={{textDecoration: 'underline', cursor: 'pointer'}}
                             onClick={e => makeMain(e)}
                        >Сделать адрес основным</div>
                }
            </div>
            <div className={s.icons_block}>
                <Image src={cross} alt='' className={s.icon} onClick={e => removeAddress(e)}/>
                <AddressModal newAddress={false} addressId={id} defAddress={address} defName={name} defMain={is_main}/>
            </div>
        </div>
    );
};

export default AddressCard;