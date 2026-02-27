import React, {useContext} from 'react';
import {Context} from "@/context/AppWrapper";
import {useRouter} from "next/router";
import headerJson from "@/components/shared/NavbarC/header.json";
import Link from "next/link";
import s from "@/components/shared/Sidebar/Sidebar.module.css";
import Image from "next/image";
import Cookies from "js-cookie";

const Bags = ({photo, handleClose}) => {
    const {userStore} = useContext(Context)
    const router = useRouter()
    const header = headerJson
    const accs = {}
    accs.popularBrands = header["Популярные бренды сумок"]
    accs.popularCats = header["Популярные категории сумок"]
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
                      query: {category: 'bags'}
                  }}
                  onClick={handleClose}
            >
                Все cумки
            </Link>
            {
                fillCol(accs.popularCats, 'category')
            }
            {
                fillCol(accs.popularBrands, 'line', {category: 'bags'})
            }
            <div className={s.img_cont}>
                <Image src={photo} alt='' fill={true} style={{objectFit: 'contain', objectPosition: 'left top'}}/>
            </div>
        </div>
    );
};

export default Bags;