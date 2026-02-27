import React, {useContext} from 'react';
import headerJson from "@/components/shared/NavbarC/header.json";
import {Context} from "@/context/AppWrapper";
import s from '../Sidebar.module.css'
import {useRouter} from "next/router";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";

const Shoes = ({photo, handleClose}) => {
    const {userStore} = useContext(Context)
    const router = useRouter()
    const header = headerJson
    const shoes = {}
    shoes.popularBrands = header["Популярные бренды обуви"]
    shoes.popularLines = header["Популярные линейки обуви"]
    shoes.cats = header["Популярные категории обуви"]
    const fillCol = (colObj, query, secondQuery) => {
        const name = colObj.name
        let gender = 'any'
        const genders = {'M': 'male', 'F': 'female'}
        if (Cookies.get("selected_gender")) {
            gender = genders[Cookies.get("selected_gender")]
        }
        const colArr = []
        colArr.push(
            <h4>{name}</h4>
        )
        const links = colObj[gender]
        for (const key in links) {
            const link = links[key]
            const linkQuery = {...secondQuery}
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
                  href={{
                      pathname: '/products',
                      query: {category: 'shoes_category'}
                  }}
                  onClick={handleClose}
            >
                Вся обувь
            </Link>
            {
                fillCol(shoes.cats, 'category')
            }
            {
                fillCol(shoes.popularBrands, 'line', {category: 'shoes_category'})
            }
            {
                fillCol(shoes.popularLines, 'line')
            }
            <div className={s.img_cont}>
                <Image src={photo} alt='' fill={true} style={{objectFit: 'contain', objectPosition: 'left top'}}/>
            </div>
        </div>
    );
};

export default Shoes;