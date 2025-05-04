import React from 'react';
import s from './BreadcrumbC.module.css'
import Link from "next/link";
import arrow from '@/static/icons/chevron-right-grey.svg'
import Image from "next/image";

const BreadcrumbC = ({list}) => {
    const renderComponent = () => {
        const arr = []
        list.forEach((el, ind) => {
            arr.push(
                <Link href={`/products?${el.query}`} className={s.link}>{el.name}</Link>
            )
            if (ind !== list.length-1) {
                arr.push(
                    <Image src={arrow} alt='' className={s.arrow}/>
                )
            }
        })
        return arr
    }
    return (
        <div className={s.breadcrumb}>
            {renderComponent()}
        </div>
    );
};

export default BreadcrumbC;