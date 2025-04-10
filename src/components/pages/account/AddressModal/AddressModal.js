import React, {useContext, useState} from 'react';
import s from './AddressModal.module.css'
import {Modal} from "react-bootstrap";
import Image from "next/image";
import close from "@/static/icons/x-lg.svg";
import edit from "@/static/icons/pencil-square.svg";
import CustomCheckbox from "@/components/shared/UI/CustoCheckbox/CustomCheckbox";
import {addAddress, deleteAddress, editAddress} from "@/http/userApi";
import {Context} from "@/context/AppWrapper";
import Cookies from "js-cookie";
import {useRouter} from "next/router";

const AddressModal = ({newAddress = false, whiteBnt = false, addressId = null}) => {
    const {userStore} = useContext(Context)
    const router = useRouter()
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => {
        setShow(true)
    };
    const [name, setName] = useState()
    const [address, setAddress] = useState()
    const [mainAddress, setMainAddress] = useState(true)

    const sendData = async (e) => {
        e.preventDefault()
        const obj = {
            name,
            address,
            is_main: mainAddress,
            post_index: 1
        }
        const token = Cookies.get('access_token')
        const userId = userStore.id
        let response
        if (newAddress) {
            response = await addAddress(token, userId, JSON.stringify(obj))
        } else {
            response = await editAddress(token, userId, addressId, JSON.stringify(obj))
        }
        setShow(false)
        router.push('/account/addresses', undefined, {scroll: false})
        return response
    }
    const removeAddress = async (e) => {
        e.preventDefault()
        const token = Cookies.get('access_token')
        const userId = userStore.id
        const response = await deleteAddress(token, userId, addressId)
        setShow(false)
        router.push('/account/addresses', undefined, {scroll: false})
        return response
    }
    return (
        <>
            {newAddress
                ?
                <button className={whiteBnt ? s.white_btn : s.btn}
                        onClick={handleShow}
                >Добавить адрес</button>
                :
                <Image src={edit} alt='' className={s.icon} onClick={handleShow}/>
            }

            <Modal show={show}
                   centered={true}
                   onHide={handleClose}
                   >
                <Modal.Body className='pt-4'>
                    <form>
                        <div className={s.close_block}>
                            <Image src={close} alt="" style={{cursor: 'pointer'}} onClick={handleClose}/>
                        </div>
                        <h4 className={s.title}>{newAddress ? 'Добавить новый адрес' : 'Редактировать адрес'}</h4>
                        <hr/>
                        <input type="text"
                               className={s.input}
                               placeholder={'Название адреса'}
                               value={name}
                               onChange={e => setName(e.target.value)}
                        />
                        <input type="text"
                               className={s.input}
                               placeholder={'Город, улица, дом'}
                               value={address}
                               onChange={e => setAddress(e.target.value)}
                        />
                        {newAddress
                            ?
                            <>
                                <div className={s.checkbox_block}>
                                    <div style={{width: 'fit-content'}}
                                         onClick={() => setMainAddress(!mainAddress)}
                                    >
                                        <CustomCheckbox checked={mainAddress}
                                                        labelText={'Сделать адрес основным'}
                                                        labelClass={s.main_address}
                                                        reversed={true}
                                        />
                                    </div>
                                </div>
                                <button className={s.add_btn}
                                        onClick={(e) => sendData(e)}
                                        type={'submit'}
                                >Добавить адрес</button>
                            </>
                            :
                            <div className={s.btn_block}>
                                <button
                                    className={s.delete_btn}
                                    onClick={(e) => removeAddress(e)}
                                >
                                    Удалить адрес
                                </button>
                                <button className={s.save_btn}
                                        type={'submit'}
                                        onClick={(e) => sendData(e)}
                                >
                                    Сохранить
                                </button>
                            </div>
                        }
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddressModal;