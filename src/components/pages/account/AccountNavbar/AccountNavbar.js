import React, {useEffect, useState} from 'react';
import s from './AccountNavbar.module.css'
import Arrow from "@/components/shared/UI/Arrow/Arrow";
import {useRouter} from "next/router";

const AccountNavbar = () => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState('')
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    const links = [
        {
            name: 'Личные данные',
            address: 'account',
            func: () => router.push('/account')

        },
        {
            name: 'Адреса',
            address: 'addresses',
            func: () => router.push('/account/addresses')

        },
        {
            name: 'Заказы',
            address: 'orders',
            func: () => router.push('/account/orders')

        },
        {
            name: 'Личные данные',
            address: 'adasd',
            func: () => router.push('/address')

        }
    ]
    useEffect(() => {
        const arr = router.pathname.split('/')
        const page = arr[arr.length-1]
        links.forEach(el => {
            if (el.address === page) {
                setCurrentPage(el.name)
            }
        })
    })
    return (
        <div>
            <div className={s.toggle}
                 onClick={toggle}
            >
                <div>
                    {currentPage}
                </div>
                <Arrow isOpen={isOpen}/>
            </div>
            {isOpen &&
                <div>
                    <hr className={s.hr}/>
                    <div className={s.items_block}>
                        {
                            links.map(el =>
                                <div onClick={el.func}
                                     className={s.item}
                                     key={el.name}
                                >
                                    {el.name}
                                </div>
                            )
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default AccountNavbar;