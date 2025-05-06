import React, {useContext, useEffect, useRef, useState} from 'react';
import s from './SizeChoice.module.css'
import truck from '@/static/icons/truck.svg'
import refund from '@/static/icons/arrow-return-left.svg'
import Image from "next/image";
import {Context} from "@/context/AppWrapper";
import {fetchShippings} from "@/http/productsApi";
import {userStore} from "@/store/UserStore";
import AuthModal from "@/components/shared/AuthModal/AuthModal";
import {Modal} from "react-bootstrap";

const SizeChoice = ({prices, productId}) => {
    const {productStore} = useContext(Context)
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const dropdownRef = useRef(null);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectItem = async (item) => {
        setSelectedItem(item);
        setIsOpen(false);
        productStore.setSizeChosen(true)
        console.log(item)
        const ships = await fetchShippings(productId, item.view_size)
        productStore.setShipps(ships)
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    const [isShow, setIsShow] = useState('')
    return (
        <div ref={dropdownRef} className={s.dropdown}>
            <div className={s.text}
                 onClick={toggleDropdown}
                 style={isOpen ? {borderRadius: '7px 7px 0 0'} : {borderRadius: '7px'}}
            >
                {
                    selectedItem
                    ?
                        <>
                            <div className={s.size_block}>
                                <div className={s.icons}>{selectedItem.view_size}</div>
                                <Image src={truck} alt="" className={s.icons}/>
                                <Image src={refund} alt="" className={s.icons}/>
                            </div>
                            <div className={s.price}>
                                от {selectedItem.min_price}
                            </div>
                        </>
                        :
                        'Выберите размер'
                }
            </div>
            <div className={s.dropdown_content}>
                {
                    isOpen &&
                    <div>
                        {
                            prices.map(el =>
                                el.available
                                    ?
                                    <div className={s.items}
                                         onClick={() => selectItem(el)}
                                         key={el.id}
                                    >
                                        <div className={s.size_block}>
                                            <div className={s.icons}>{el.view_size}</div>
                                            {el.is_fast_shipping && <Image src={truck} alt="" className={s.icons}/>}
                                            {el.is_return && <Image src={refund} alt="" className={s.icons}/>}
                                        </div>
                                        <div className={s.price}>
                                            от {el.min_price}
                                        </div>
                                    </div>
                                    :
                                    <div className={s.items_not}
                                    >
                                        <div className={s.size_block}>
                                            <div className={s.crossed_text}>{el.view_size}</div>
                                        </div>
                                        <div className='d-flex'>
                                            Распродано.
                                            {userStore.isLogged ?
                                                <button className={s.link}>Сообщить о поступлении</button>
                                                :
                                                <AuthModal inline={true}
                                                           text={'Зарегистрируйстесь, чтобы получить уведомление о поступлении'}>
                                                    <button className={s.link}>Сообщить о поступлении</button>
                                                </AuthModal>
                                            }
                                        </div>
                                    </div>
                            )
                        }
                    </div>
                }
            </div>

            <Modal>
                <Modal.Body>

                </Modal.Body>
            </Modal>
        </div>
    );
};

export default SizeChoice;