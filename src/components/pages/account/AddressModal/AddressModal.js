import React, {useState} from 'react';
import s from './AddressModal.module.css'
import {Modal} from "react-bootstrap";
import Image from "next/image";
import close from "@/static/icons/x-lg.svg";
import InputMask from "react-input-mask";
import CustomCheckbox from "@/components/shared/UI/CustoCheckbox/CustomCheckbox";
import edit from "@/static/icons/pencil-square.svg";

const AddressModal = ({newAddress = false}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => {
        setShow(true)
    };
    const [name, setName] = useState()
    const [address, setAddress] = useState()
    const [apartment, setApartment] = useState()
    const [phone, setPhone] = useState()
    const [mainAddress, setMainAddress] = useState(true)
    return (
        <>
            {newAddress
                ?
                <button className={s.btn}
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
                    <input type="text"
                           className={s.input}
                           placeholder={'Квартира'}
                           value={apartment}
                           onChange={e => setApartment(e.target.value)}
                    />
                    <InputMask mask="+7 999 999-99-99" maskChar={null}
                               value={phone}
                               onChange={e => setPhone(e.target.value)}
                    >
                        {(inputProps) => <input {...inputProps} type="tel"
                                                placeholder="Номер телефона"
                                                className={s.input}
                        />}
                    </InputMask>
                    {newAddress
                        ?
                        <>
                            <div className={s.checkbox_block}>
                                <CustomCheckbox checked={mainAddress}
                                                labelText={'Сделать адрес основным'}
                                                labelClass={s.main_address}
                                                reversed={true}
                                />
                            </div>
                            <button className={s.add_btn}>Добавить адрес</button>
                        </>
                        :
                        <div className={s.btn_block}>
                            <button
                                className={s.delete_btn}>
                                Удалить адрес
                            </button>
                            <button className={s.save_btn}>
                                Сохранить
                            </button>
                        </div>
                    }
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddressModal;