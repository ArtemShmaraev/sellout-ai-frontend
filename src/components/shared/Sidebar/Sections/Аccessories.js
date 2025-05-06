import React, {useContext} from 'react';
import headerJson from "@/components/shared/NavbarC/header.json";
import {Context} from "@/context/AppWrapper";
import s from '../Sidebar.module.css'
import {useRouter} from "next/router";
import Image from "next/image";

const Accessories = ({photo}) => {
    const {userStore} = useContext(Context)
    const router = useRouter()
    const header = headerJson
    const accs = {}
    accs.popularBrands = header["Популярные бренды аксессуаров"]
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
                    onClick={e => {
                        e.preventDefault()
                        router.push(`/products?${genderQuery}${query}=${link.query_name}${secondQuery}`)
                    }}
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
    const queryGender = userStore.gender ? '&gender=' + userStore.gender[0].toUpperCase() : ''
    return (
        <div style={{marginTop: 15}}>
            <a className={s.all_link}
               href={`/products?category=accessories${queryGender}`}
            >
                Все аксессуары
            </a>
            {
                fillCol(accs.popularBrands, 'line', '&category=accessories')
            }
            <div className={s.img_cont}>
                <Image src={photo} alt='' fill={true} style={{objectFit: 'contain', objectPosition: 'left top'}}/>
            </div>
        </div>
    );
};

export default Accessories;