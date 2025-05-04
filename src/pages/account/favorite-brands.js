import React from 'react';
import {parse} from "cookie";
import jwtDecode from "jwt-decode";
import {fetchFavoriteBrands} from "@/http/userApi";
import s from "@/styles/BrandsPage.module.css";
import Brand from "@/components/pages/brands/Brand";
import AccountLayout from "@/layout/AccountLayout";


export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['access_token']
    const {user_id} = jwtDecode(token)
    const brands = await fetchFavoriteBrands(token, user_id)
    return { props: {brands} }
}

const FavoriteBrands = ({brands}) => {
    const renderBrands = () => {
        let arr = []
        let currLetter = ''
        for (let i = 0; i < brands.length; i++) {
            if (currLetter.toUpperCase() !== brands[i].name[0].toUpperCase() && !/^\d$/.test(brands[i].name[0])) {
                currLetter = brands[i].name[0]
                arr.push(
                    <h4 key={brands[i].name[0]}
                        id={brands[i].name[0]}
                        className={s.big_letter}
                    >
                        {brands[i].name[0].toUpperCase()}
                    </h4>
                )
            }
            if (currLetter !== '0-9' && /^\d$/.test(brands[i].name[0])) {
                currLetter = '0-9'
                arr.push(
                    <h4 key={'0-9'}
                        id={'0-9'}
                        className={s.big_letter}
                    >
                        0-9
                    </h4>
                )
            }
            arr.push(
                <Brand name={brands[i].name}
                       brandId={brands[i].id}
                       query={brands[i].query_name}
                       inWL={brands[i].in_wishlist}
                />
            )
        }
        return arr
    }
    return (
        <AccountLayout>
            {renderBrands()}
        </AccountLayout>
    );
};

export default FavoriteBrands;