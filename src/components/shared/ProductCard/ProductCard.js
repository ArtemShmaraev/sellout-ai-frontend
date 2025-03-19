import React, {useState} from 'react';
import s from './ProductCard.module.css'
import shoe from '@/static/img/shoe.png'
import shoe2 from '@/static/img/shoe2.png'
import like from '@/static/icons/heart.svg'
import truck from '@/static/icons/truck.svg'
import re from '@/static/icons/arrow-return-left.svg'
import Image from 'next/image'


const ProductCard = ({model, brands, colorway, price}) => {
    const [isHovered, setIsHovered] = useState(false);
    const brandsDisplay = (brands) => {
        if (!brands) {
            return 'No brand'
        }
        if (brands.length > 1) {
            let str = brands[0].name
            for (let i = 1; i < brands.length; i++) {
                str += ` x ${brands[i].name}`
            }
            return str
        }
        return brands[0].name
    }


    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className={s.card}>
            <div className={s.icons_block}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div className={s.sale}>-20%</div>
                    <Image src={truck} alt="shippment" className={s.truck}/>
                    <Image src={re} alt="shippment" className={s.truck}/>
                </div>
                <Image src={like} alt="like" className={s.like}/>
            </div>
            <Image
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={s.img}
                src={isHovered ? shoe2 : shoe} alt="shoe"/>
            <div className={s.text_block}>
                <div className={s.tag}>{brandsDisplay(brands)}</div>
                <div className={s.brand}>{model || 'No model'}</div>
                <div className={s.name}>{colorway}</div>
                <div className={s.price}>От {price}</div>
            </div>
        </div>
    );
};

export default ProductCard;