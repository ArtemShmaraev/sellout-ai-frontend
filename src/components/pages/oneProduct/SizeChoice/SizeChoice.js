import React, {useEffect, useRef, useState} from 'react';
import s from './SizeChoice.module.css'
import truck from '@/static/icons/truck.svg'
import refund from '@/static/icons/arrow-return-left.svg'
import Image from "next/image";

const SizeChoice = () => {
    const sizes = [
        '10US',
        '15US',
        '17US',
        '10US',
        '15US',
        '17US',
        '10US',
        '15US',
        '17US',
        '10US',
        '15US',
        '17US',
        '10US',
        '15US',
        '17US',
        '10US',
        '15US',
        '17US',
        '10US',
        '15US',
        '17US',

    ]
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const dropdownRef = useRef(null);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectItem = (item) => {
        setSelectedItem(item);
        setIsOpen(false);
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
                                <div className={s.icons}>{selectedItem}</div>
                                <Image src={truck} alt="" className={s.icons}/>
                                <Image src={refund} alt="" className={s.icons}/>
                            </div>
                            <div className={s.price}>
                                от 19999 $
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
                        <>
                            <div className={s.items_not}
                            >
                                <div className={s.size_block}>
                                    <div className={s.crossed_text}>1 US</div>
                                </div>
                                <div className='d-flex'>
                                    Распродано.
                                    <a href="" className={s.link}>Сообщить о поступлении</a>
                                </div>
                            </div>
                        </>
                        {
                            sizes.map(el =>
                                <div className={s.items}
                                     onClick={() => selectItem(el)}
                                >
                                    <div className={s.size_block}>
                                        <div className={s.icons}>{el}</div>
                                        <Image src={truck} alt="" className={s.icons}/>
                                        <Image src={refund} alt="" className={s.icons}/>
                                    </div>
                                    <div className={s.price}>
                                        от 19999 $
                                    </div>
                                </div>
                            )
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default SizeChoice;