import React, {useContext} from 'react';
import headerJson from "@/components/shared/NavbarC/header.json";
import {Context} from "@/context/AppWrapper";
import s from '../Sidebar.module.css'
import {useRouter} from "next/router";
import Image from "next/image";
import arrow from "@/static/icons/chevron-right.svg";
import Link from "next/link";

const Brand = ({photo, handleClose}) => {
    const {userStore} = useContext(Context)
    const router = useRouter()
    const header = headerJson
    const brands = {}
    brands.popularBrands = header["Популярные бренды"]
    brands.collabs = header["Коллаборации"]
    const fillCol = (colObj, query, secondQuery) => {
        const name = colObj.name
        let gender = 'any'
        let queryObj = {}
        if (userStore.gender) {
            gender = userStore.gender
            queryObj.gender = gender[0].toUpperCase()
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
    return (
        <div style={{marginTop: 15}}>
            <Link className={s.all_link}
                  onClick={handleClose}
                  href={`/brands`}
            >
                Все бренды
            </Link>
            {
                fillCol(brands.popularBrands, 'line')
            }
            {
                fillCol(brands.collabs, 'collab')
            }
            <div className={s.img_cont}>
                <Image src={photo} alt='' fill={true} style={{objectFit: 'contain', objectPosition: 'left top'}}/>
            </div>
        </div>
    );
};

export default Brand;