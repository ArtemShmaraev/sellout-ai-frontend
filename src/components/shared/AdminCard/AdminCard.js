import React, {useState} from 'react';
import s from "./AdminCard.module.css";
import truck from "@/static/icons/truck.svg";
import re from "@/static/icons/arrow-return-left.svg";
import like from "@/static/icons/heart.svg";
import shoe from "@/static/img/shoe.png";
import ScrollableBDropdown from "@/components/shared/UI/ScrollableBDropdown/ScrollableBDropdown";
import {Carousel} from "react-bootstrap";
import Image from "next/image";

const AdminCard = () => {
    const [tag, setTag] = useState('Tag')
    const [name, setName] = useState('Name')
    const [price, setPrice] = useState('300$')
    return (
        <div className={s.card}>
            <div className={s.icons_block}>
                <div style={{display: 'flex'}}>
                    <div className={s.sale}>-20%</div>
                    <Image src={truck} alt="shippment" className={s.truck}/>
                    <Image src={re} alt="shippment" className={s.truck}/>
                </div>
                <div className='d-flex align-items-center'>
                    <Image src={like} alt="like" className={s.like}/>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red"
                         className="bi bi-x-lg" viewBox="0 0 16 16" style={{cursor: 'pointer'}}>
                        <path
                            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                    </svg>
                </div>
            </div>
            <Carousel
                variant='dark'
                indicators={false}
                interval={null}
            >
                <Carousel.Item>
                    <Image className={s.img}
                         src={shoe} alt="shoe"/>
                </Carousel.Item>
                <Carousel.Item>
                    <Image className={s.img}
                         src={shoe} alt="shoe"/>
                </Carousel.Item>
            </Carousel>
            <div className='d-flex justify-content-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red"
                     className="bi bi-x-lg" viewBox="0 0 16 16" style={{cursor: 'pointer'}}>
                    <path
                        d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                </svg>
            </div>
            <div className={s.text_block}>
                <input
                    className={s.tag}
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                />

                <ScrollableBDropdown toggleText={'Бренд'} isSearch={true}/>
                <input
                    className={s.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className={s.price}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <div className='d-flex justify-content-between mb-1'>
                    <ScrollableBDropdown toggleText={'Категория'}/>
                    <ScrollableBDropdown toggleText={'Линейка'}/>
                </div>
                <div className='d-flex justify-content-between'>
                    <ScrollableBDropdown toggleText={'Пол'}/>
                    <ScrollableBDropdown toggleText={'Размер'}/>
                </div>
            </div>
        </div>
    );
};

export default AdminCard;