import React, {useContext, useEffect, useRef, useState} from 'react';
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
import {suggestions} from "@/http/dadataApi";

const AddressModal = ({newAddress = false, whiteBnt = false,
                          addressId = null, defName = '',
                          defAddress = '', defMain = true}) => {
    const {userStore} = useContext(Context)
    const router = useRouter()
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        setSuggsShown(false)
    };
    const handleShow = () => {
        setShow(true)
    };
    const [name, setName] = useState(defName)
    const [address, setAddress] = useState(defAddress)
    const [mainAddress, setMainAddress] = useState(defMain)
    const [postInd, setPostInd] = useState(null)

    const sendData = async (e) => {
        e.preventDefault()
        const obj = {
            name,
            address,
            is_main: mainAddress,
            post_index: postInd
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
        const {pathname, query} = router
        router.push({pathname, query}, undefined, {scroll: false})
        return response
    }
    const removeAddress = async (e) => {
        e.preventDefault()
        const token = Cookies.get('access_token')
        const userId = userStore.id
        const response = await deleteAddress(token, userId, addressId)
        setShow(false)
        const {pathname, query} = router
        await router.push({pathname, query}, undefined, {scroll: false})
        return response
    }

    const [suggs, setSuggs] = useState(null)
    const [suggsShown, setSuggsShown] = useState(false)
    const sugRef = useRef(null)
    const inputRef = useRef(null)
    const dadata = async (str) => {
        return await suggestions(str)
    }
    const changeAddress = async (e) => {
        const str = e.target.value
        setAddress(str)
        if (str.length > 4) {
            const res = await dadata(str)
            if (res.suggestions.length > 0) {
                setSuggsShown(true)
                setSuggs(res.suggestions)
            }
        } else {
            setSuggsShown(false)
            setSuggs(null)
        }
    }
    const selectAddress = (item) => {
        setAddress(item.value)
        setPostInd(item.data.postal_code)
        setSuggsShown(false)
    }
    const clickInput = async () => {
        if (address.length > 4) {
            const res = await dadata(address)
            setSuggsShown(true)
            setSuggs(res.suggestions)
        }
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sugRef.current && !sugRef.current.contains(event.target)) {
                setSuggsShown(false);
                setSuggs(null)
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
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
                    <form onSubmit={(e) => sendData(e)}>
                        <div className={s.close_block}>
                            <Image src={close} alt="" style={{cursor: 'pointer'}} onClick={handleClose}/>
                        </div>
                        <h4 className={s.title}>{newAddress ? 'Добавить новый адрес' : 'Редактировать адрес'}</h4>
                        <hr/>
                        <div ref={sugRef}>
                            <input type="text"
                                   ref={inputRef}
                                   className={s.input}
                                   placeholder={'Город, улица, дом'}
                                   value={address}
                                   onChange={e => changeAddress(e)}
                                   onClick={clickInput}
                                   style={suggsShown ? {borderRadius: '7px 7px 0 0'} : {}}
                            />
                            {
                                suggsShown &&
                                <div className={s.sug_block}>
                                    {
                                        suggs.map(el =>
                                            <div className={s.sug_item}
                                                 onClick={() => selectAddress(el)}
                                                 key={el.value}>
                                                {el.value}
                                            </div>
                                        )
                                    }
                                </div>
                            }
                        </div>
                        <input type="text"
                               className={s.input}
                               placeholder={'Название адреса (например, домашний)'}
                               value={name}
                               onChange={e => setName(e.target.value)}
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
                                        type={'submit'}
                                >Добавить адрес</button>
                            </>
                            :
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
                                <div className={s.btn_block}>
                                    <button
                                        className={s.delete_btn}
                                        onClick={(e) => removeAddress(e)}
                                    >
                                        Удалить адрес
                                    </button>
                                    <button className={s.save_btn}
                                            type={'submit'}
                                    >
                                        Сохранить
                                    </button>
                                </div>
                            </>
                        }
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddressModal;