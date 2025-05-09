import React, {useContext} from 'react';
import headerJson from "@/components/shared/NavbarC/header.json";
import {Context} from "@/context/AppWrapper";
import s from '../Sidebar.module.css'
import {useRouter} from "next/router";
import Image from "next/image";
import arrow from "@/static/icons/chevron-right.svg";

const Brand = ({photo}) => {
    const {userStore} = useContext(Context)
    const router = useRouter()
    const header = headerJson
    const brands = {}
    brands.popularBrands = header["Популярные бренды"]
    brands.collabs = header["Коллаборации"]
    const fillCol = (colObj, query, secondQuery = '') => {
        const name = colObj.name
        let gender = 'any'
        let genderQuery = ''
        if (userStore.gender) {
            gender = userStore.gender
            genderQuery = 'gender=' + gender[0].toUpperCase() + '&'
        }
        const colArr = []
        colArr.push(
            <h4>{name}</h4>
        )
        const links = colObj[gender]
        for (const key in links) {
            const link = links[key]
            colArr.push(
                <a
                    className={s.link}
                    href={`/products?${genderQuery}${query}=${link.query_name}${secondQuery}`}
                >
                    {link.name}
                </a>
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
            <a className={s.all_link}
               href={`/brands`}
            >
                Все бренды
            </a>
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