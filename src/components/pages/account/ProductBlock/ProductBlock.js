import React from 'react';
import s from './ProductBlock.module.css'
import Image from "next/image";
import Link from "next/link";

const ProductBlock = ({unit}) => {
    const brandsDisplay = () => {
        if (unit.product.collab) {
            return unit.product.collab.name
        } else {
            return unit.product.brands[0].name
        }
    }
    const addSpacesToNumber = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    try {
        return (
            <div className={s.row}>
                <Link href={`/products/${unit.product.slug}`} className={s.col1}>
                    {unit.product.bucket_link[0] &&
                        <Image src={unit.product.bucket_link[0].url} alt=''
                               className={s.img} fill={true} sizes={'width: 100%'}/>}
                </Link>
                <div className={s.inner_row}>
                    <div className={s.col}>
                        <div>
                            <div className={s.brand}>{brandsDisplay()}</div>
                            <div className={s.text} style={{fontWeight: 700}}>{unit.product.model}</div>
                            <div className={s.text}>{unit.product.colorway}</div>
                        </div>
                    </div>
                    <div className={s.col}>
                        <div className={s.dropdowns}>
                            <div className={s.brand}>Размер</div>
                            <div className={s.text}>{unit.view_size_platform}</div>
                            <div className={s.number_block}>
                                <div className={s.brand}>Статус</div>
                                <div className={s.text} id={'status'}>{unit.status.name}</div>
                            </div>
                        </div>
                    </div>
                    <div className={s.col}>
                        <div className={s.dropdowns}>
                            <div className={s.brand}>Цена</div>
                            <div className={s.text}>{addSpacesToNumber(unit.final_price)} ₽</div>
                        </div>
                        <div className={s.number_block}>
                            <div className={s.brand}>Доставка</div>
                            <div className={s.text} id={'status'}>{unit.delivery_date_str}</div>
                        </div>
                        {
                            unit.track_number &&
                            <div className={s.number_block}>
                                <div className={s.brand}>Трек-номер</div>
                                <div className={s.text}>
                                    <a href={`https://1track.ru/tracking/${unit.track_number}`}
                                       target={'_blank'}
                                       className={'text-black'}
                                    >{unit.track_number}</a>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Произошла ошибка:', error);
        return null; // или любое другое значение по умолчанию
    }

};

export default ProductBlock;