import React, {useEffect, useState} from 'react';
import s from './AccountNavbar.module.css'
import Arrow from "@/components/shared/UI/Arrow/Arrow";
import {useRouter} from "next/router";
import Link from "next/link";

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
            link: '/account'

        },
        {
            name: 'Адреса',
            address: 'addresses',
            link: '/account/addresses'

        },
        {
            name: 'Заказы',
            address: 'orders',
            link: '/account/orders'

        },
        {
            name: 'Любимые бренды',
            address: 'favorite-brands',
            link: '/account/favorite-brands'

        },
        {
            name: 'Программа лояльности',
            address: 'loyalty',
            link: '/account/loyalty'

        },
        {
            name: 'Реферальная программа',
            address: 'referral',
            link: '/account/referral'

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
                                <Link href={el.link}
                                     className={s.item}
                                     key={el.name}
                                >
                                    {el.name}
                                </Link>
                            )
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default AccountNavbar;