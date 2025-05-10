import React, {useContext} from 'react';
import headerJson from "@/components/shared/NavbarC/header.json";
import {Context} from "@/context/AppWrapper";
import s from '../Sidebar.module.css'
import {useRouter} from "next/router";
import Image from "next/image";
import Link from "next/link";

const Accessories = ({photo, handleClose}) => {
    const {userStore} = useContext(Context)
    const router = useRouter()
    const header = headerJson
    const accs = {}
    accs.popularBrands = header["Популярные бренды аксессуаров"]
    const fillCol = (colObj, query, secondQuery) => {
        const name = colObj.name
        let gender = 'any'
        let queryObj = {}
        if (userStore.gender) {
            gender = userStore.gender
            queryObj.gender = gender
        }
        const colArr = []
        colArr.push(
            <h4>{name}</h4>
        )
        const links = colObj[gender]
        for (const key in links) {
            const link = links[key]
            const linkQuery = {...queryObj, ...secondQuery}
            linkQuery[query] = link.query_name
            colArr.push(
                <Link
                    className={s.link}
                    href={{
                        pathname: '/products',
                        query: linkQuery
                    }}
                    onClick={handleClose}
                >
                    {link.name}
                </Link>
            )
        }
        return (
            <div className={s.col}>
                {colArr}
            </div>
        )
    }
    const queryGender = userStore.gender ? {gender: userStore.gender[0].toUpperCase()} : {}
    return (
        <div style={{marginTop: 15}}>
            <Link className={s.all_link}
                  href={{
                      pathname: '/products',
                      query: {category: 'accessories', ...queryGender}
                  }}
                  onClick={handleClose}
            >
                Все аксессуары
            </Link>
            {
                fillCol(accs.popularBrands, 'line', {category: 'accessories'})
            }
            <div className={s.img_cont}>
                <Image src={photo} alt='' fill={true} style={{objectFit: 'contain', objectPosition: 'left top'}}/>
            </div>
        </div>
    );
};

export default Accessories;