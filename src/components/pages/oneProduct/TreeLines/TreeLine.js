import React, {useContext, useState} from 'react';
import s from './TreeLine.module.css'
import Link from "next/link";
import arrow from '@/static/icons/chevron-right-grey.svg'
import Image from "next/image";
import most_pop from './most_pop.json'
import {Context} from "@/context/AppWrapper";


const BreadItem = ({el}) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = (e) => {
        setIsHovered(true)
        const nameElement = e.currentTarget.querySelector(`.${s.name}`);
        const overflow = nameElement.scrollWidth > nameElement.clientWidth;
        if (overflow) {
            nameElement.style.animation = `${s.slide} ${(nameElement.scrollWidth / 100)}s linear infinite`;
        }
    };

    const handleMouseLeave = (e) => {
        setIsHovered(false)
        const nameElement = e.currentTarget.querySelector(`.${s.name}`);
        nameElement.style.animation = 'none';
    };

    return (
        <div className={s.width33}>
            <Link className={s.breadcrumbItem} href={`/products?${el.query}`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}>
                {el.name in most_pop && (
                    <div className={s.imageContainer}>
                        <img
                            src={most_pop[el.name].photo}
                            alt={el.name}
                            className={s.image}
                            loading={'eager'}
                        />
                    </div>
                )}
                <div className={s.textContainer} style={{marginLeft: el.name in most_pop ? "8px" : "12px"}}>
                    <div className={`${s.name} ${isHovered ? s.noEllipsis : ''}`}>{el.name}</div>

                    {el.name in most_pop && (
                        <div className={s.count}>{most_pop[el.name].count}</div>
                    )}
                </div>
            </Link>
        </div>

    )

}

const TreeLine = ({ list }) => {
    const {desktopStore} = useContext(Context)





    const renderComponent = () => {
        const arr = [];
        const length = list.length;
        const new_list = list.slice(length - 3, length)
        new_list.forEach((el, ind) => {
            if (desktopStore.isDesktop) {
                arr.push(
                   <BreadItem el={el}/>
                );
                if (ind !== new_list.length - 1) {
                    arr.push(<Image src={arrow} alt='' className={s.arrow} />);
                }
            } else {
                arr.push(
                    <>
                        <BreadItem el={el}/>
                        <hr className={s.hr}/>

                        </>

                );
            }

        })

        return arr;
    };


    return (
        <div className={s.breadcrumbContainer}>
            {renderComponent()}
        </div>
    );
};


export default TreeLine;