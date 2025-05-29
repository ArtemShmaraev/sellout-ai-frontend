import React from 'react';
import s from './ProductBlock.module.css'
import Image from "next/image";
import shoe from "@/static/img/shoe2.png";

const ProductBlock = ({unit}) => {
    const brandsDisplay = () => {
        if (unit.product.collab) {
            return unit.product.collab.name
        } else {
            return unit.product.brands[0].name
        }
    }
    return (
        <div className={s.row}>
            <div className={s.col1}>
                <Image src={unit.product.bucket_link[0].url} alt=''
                       className={s.img} fill={true} sizes={'width: 100%'}/>
            </div>
            <div className={s.inner_row}>
                <div className={s.col}>
                    <div>
                        <div className={s.brand}>{brandsDisplay()}</div>
                        <div className={s.text}>{unit.product.model}</div>
                        <div className={s.text}>{unit.product.colorway}</div>
                    </div>
                </div>
                <div className={s.col}>
                    <div className={s.dropdowns}>
                        <div className={s.brand}>Размер</div>
                        <div className={s.text}>{unit.view_size_platform}</div>
                        <div className={s.number_block}>
                            <div className={s.brand}>Статус</div>
                            <div className={s.text}>{unit.status.name}</div>
                        </div>
                    </div>
                </div>
                <div className={s.col}>
                    <div className={s.dropdowns}>
                        <div className={s.brand}>Цена</div>
                        <div className={s.text}>{unit.final_price} ₽</div>
                    </div>
                    {/*<div className={s.ship_block}>*/}
                    {/*    <div className={s.brand}>Количество</div>*/}
                    {/*    <div className={s.text}>1</div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
};

export default ProductBlock;