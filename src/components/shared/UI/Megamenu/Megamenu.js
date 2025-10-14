import React, {useContext, useEffect, useRef, useState} from 'react';
import s from './Megamenu.module.css'
import Link from "next/link";
import Image from "next/image";
import headerJson from "@/components/shared/NavbarC/header.json";
import {Context} from "@/context/AppWrapper";
import Cookies from 'js-cookie'

const Megamenu = ({className, label, link, type, photos, visible}) => {
    const {userStore} = useContext(Context)
    const ref = useRef(null)
    const [isShown, setIsShown] = useState(false)
    const header = headerJson


    const renderMegamenu = (numInCol, colNum, basicObj, query, title, constantQuery = {}) => {
        const cols = []
        let gender = 'any'
        const genders = {'M': 'male', 'F': 'female'}
        if (Cookies.get("selected_gender")) {
            gender = genders[Cookies.get("selected_gender")]
        }
        let obj = basicObj[gender]
        const keys = Object.keys(obj)
        for (let i = 0; i < colNum; i++) {
            let rows = []
            for (let j = 0; j < numInCol; j++) {
                const dataInd = i * numInCol + j
                const rowObj = obj[keys[dataInd]]
                const linkQuery = {...constantQuery}
                linkQuery[query] = rowObj.query_name
                rows.push(
                    <Link
                        href={{
                            pathname: '/products',
                            query: linkQuery
                        }}
                        onClick={() => setIsShown(false)}
                        className={s.megamenu_links}
                    >
                        {rowObj.name}</Link>
                )
            }
            cols.push(
                <div style={{minWidth: `${100/colNum}%`}}>
                    {rows}
                </div>
            )
        }
        const result = (
            <div style={{minWidth: `${20* colNum}%`}} key={title}>
                <h4 className={s.h_text}>{title}</h4>
                <div className={s.cols_block}>
                    {cols}
                </div>
            </div>
        )
        return result
    }

    let timeoutId;
    const handleMouseEnter = () => {
        timeoutId = setTimeout(() => {
            if (visible) {
                setIsShown(true);
            }
        }, 200); // Задержка в 1 секунду (1000 миллисекунд)
    };

    const handleMouseLeave = () => {
        clearTimeout(timeoutId); // Очистить таймер, если курсор ушел
        setIsShown(false);
    };

    useEffect(() => {
        return () => {
            clearTimeout(timeoutId); // Очистить таймер при размонтировании компонента
        };
    }, [timeoutId]);
    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link
                href={link}
                className={className}
                ref={ref}
                onClick={() => setIsShown(false)}
            >
                {label}
            </Link>
            {visible &&
                <div className={!isShown ? s.displayNone : ''}>
                    <div className={s.all}
                    >
                        <div className={s.megamenu}
                             ref={ref}
                        >
                            <div className={s.cont}>
                                {
                                    type === 'brands' &&
                                    <div className={s.megamenu_row}>
                                        {
                                            renderMegamenu(15, 3,
                                                header['Популярные бренды'], 'line',
                                                'Популярные бренды'
                                            )
                                        }
                                        {
                                            renderMegamenu(15, 1,
                                                header['Коллаборации'], 'collab',
                                                'Коллаборации'
                                            )
                                        }
                                        <div className={s.img_col}>
                                            <div className={'w-100'}>
                                                <div className={s.img_cont}>
                                                    <Image src={photos.brand}
                                                           alt=''
                                                           fill={true}
                                                           sizes={'100%'}
                                                           className={s.img}
                                                           loading={'eager'}
                                                    />
                                                </div>
                                                <div className={s.link_block}>
                                                    <Link className={s.img_link}
                                                          href={{
                                                              pathname: '/brands',
                                                          }}
                                                    >
                                                        Все бренды
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    type === 'shoes' &&
                                    <div className={s.megamenu_row}>
                                        {
                                            renderMegamenu(15, 2,
                                                header['Популярные линейки обуви'], 'line',
                                                'Популярные линейки'
                                            )
                                        }
                                        {
                                            renderMegamenu(15, 1,
                                                header['Популярные категории обуви'], 'category',
                                                'Категории'
                                            )
                                        }
                                        {
                                            renderMegamenu(15, 1,
                                                header['Популярные бренды обуви'], 'line',
                                                'Популярные бренды', {category: 'shoes_category'}
                                            )
                                        }
                                        <div className={s.img_col}>
                                            <div className={'w-100'}>
                                                <div className={s.img_cont}>
                                                    <Image src={photos.shoes}
                                                           alt=''
                                                           fill={true}
                                                           sizes={'100%'}
                                                           className={s.img}
                                                           loading={'eager'}
                                                    />
                                                </div>
                                                <div className={s.link_block}>
                                                    <Link className={s.img_link}
                                                          href={{
                                                              pathname: '/products',
                                                              query: {category: 'shoes_category'}
                                                          }}
                                                    >
                                                        Вся обувь
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    type === 'clothes' &&
                                    <div className={s.megamenu_row}>
                                        {
                                            renderMegamenu(15, 2,
                                                header['Популярные категории одежды'], 'category',
                                                'Категории'
                                            )
                                        }
                                        {
                                            renderMegamenu(15, 2,
                                                header['Популярные бренды одежды'], 'line',
                                                'Популярные бренды', {category: 'clothes'}
                                            )
                                        }
                                        <div className={s.img_col}>
                                            <div className={'w-100'}>
                                                <div className={s.img_cont}>
                                                    <Image src={photos.clothes}
                                                           alt=''
                                                           fill={true}
                                                           sizes={'100%'}
                                                           className={s.img}
                                                           loading={'eager'}
                                                    />
                                                </div>
                                                <div className={s.link_block}>
                                                    <Link className={s.img_link}
                                                          href={{
                                                              pathname: '/products',
                                                              query: {category: 'clothes'}
                                                          }}
                                                    >
                                                        Вся одежда
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    type === 'accessories' &&
                                    <div className={s.megamenu_row}>
                                        {
                                            renderMegamenu(15, 3,
                                                header['Популярные бренды аксессуаров'], 'line',
                                                'Популярные бренды', {category: 'accessories'}
                                            )
                                        }
                                        {
                                            renderMegamenu(15, 1,
                                                header['Популярные категории аксессуаров'], 'category',
                                                'Популярные категории'
                                            )
                                        }
                                        <div className={s.img_col}>
                                            <div className={'w-100'}>
                                                <div className={s.img_cont}>
                                                    <Image src={photos.accessories}
                                                           alt=''
                                                           fill={true}
                                                           sizes={'100%'}
                                                           className={s.img}
                                                           loading={'eager'}
                                                    />
                                                </div>
                                                <div className={s.link_block}>
                                                    <Link className={s.img_link}
                                                          href={{
                                                              pathname: '/products',
                                                              query: {category: 'accessories'}
                                                          }}
                                                    >
                                                        Все аксессуары
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    type === 'bags' &&
                                    <div className={s.megamenu_row}>
                                        {
                                            renderMegamenu(15, 3,
                                                header['Популярные бренды сумок'], 'line',
                                                'Популярные бренды', {category: 'bags'}
                                            )
                                        }
                                        {
                                            renderMegamenu(15, 1,
                                                header['Популярные категории сумок'], 'category',
                                                'Популярные категории'
                                            )
                                        }
                                        <div className={s.img_col}>
                                            <div className={'w-100'}>
                                                <div className={s.img_cont}>
                                                    <Image src={photos.bags}
                                                           alt=''
                                                           fill={true}
                                                           sizes={'100%'}
                                                           className={s.img}
                                                           loading={'eager'}
                                                    />
                                                </div>
                                                <div className={s.link_block}>
                                                    <Link className={s.img_link}
                                                          href={{
                                                              pathname: '/products',
                                                              query: {category: 'bags'}
                                                          }}
                                                    >
                                                        Все аксессуары
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={s.black_area}
                             onMouseEnter={() => setIsShown(false)}
                        ></div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Megamenu;