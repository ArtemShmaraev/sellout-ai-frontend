import React, {useContext, useState} from 'react';
import s from './TreeLine.module.css'
import Link from "next/link";
import arrow from '@/static/icons/chevron-right-grey.svg'
import Image from "next/image";
import most_pop from './most_pop.json'
import {Context} from "@/context/AppWrapper";
import {desktopStore} from "@/store/DesktopStore";


const BreadItem = ({el, ind}) => {
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
        <div className={s.width33} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link itemProp="item" className={s.breadcrumbItem} href={`/products?${el.query}`}
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
                    <div itemProp="name" className={`${s.name}`}
                         style={{fontSize: (el.name.length > 30 && desktopStore.isDesktop) ? '12px' : "14px"}}>{el.name}</div>

                    {el.name in most_pop && (
                        <div className={s.count}>{most_pop[el.name].count}</div>
                    )}
                </div>
                {!desktopStore.isDesktop &&
                    <Image src={arrow} alt='' className={s.arrow_mob}/>
                }
            </Link>
            <meta itemProp="position" content={ind + 1}/>
        </div>

    )

}

const TreeLine = ({list}) => {
    const {desktopStore} = useContext(Context)

    const renderComponent = () => {
        const arr = [];
        const length = list.length;
        if (length === 4) {
            delete list[1]
        }
        const new_list = list
        new_list.forEach((el, ind) => {
            if (desktopStore.isDesktop) {
                arr.push(
                    <BreadItem el={el} ind={ind}/>
                );
                if (ind !== new_list.length - 1) {
                    arr.push(<Image src={arrow} alt='' className={s.arrow}/>);
                }
            } else {
                arr.push(
                    <>
                        <BreadItem el={el} ind={ind}/>
                        <hr className={s.hr} style={{marginTop: '7px', marginBottom: '7px'}}/>
                    </>
                );
            }

        })

        return arr;
    };


    return (
        <div itemScope itemType="https://schema.org/BreadcrumbList" className={s.breadcrumbContainer}>
            {renderComponent()}
        </div>
    );
};


export default TreeLine;