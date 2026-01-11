import React, {useContext} from 'react';
import s from './TreeLine.module.css'
import Link from "next/link";
import arrow from '@/static/icons/chevron-right-grey.svg'
import Image from "next/image";
import most_pop from './most_pop.json'
import {Context} from "@/context/AppWrapper";


const TreeLine = ({ list }) => {
    const {desktopStore} = useContext(Context)

    const renderComponent = () => {
        const arr = [];
        const length = list.length;
        const new_list = list.slice(length - 3, length)
        new_list.forEach((el, ind) => {
            if (desktopStore.isDesktop) {
                arr.push(
                    <div className={s.width33} key={ind}>
                        <Link className={s.breadcrumbItem} href={`/products?${el.query}`}>
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
                                <div className={s.name}>{el.name}</div>
                                {el.name in most_pop && (
                                    <div className={s.count}>{most_pop[el.name].count}</div>
                                )}
                            </div>
                        </Link>
                    </div>
                );
                if (ind !== new_list.length - 1) {
                    arr.push(<Image src={arrow} alt='' className={s.arrow} />);
                }
            } else {
                arr.push(
                    <>

                        <Link className={s.breadcrumbItem} href={`/products?${el.query}`}>
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
                            <div className={s.textContainer}>
                                <div className={s.name}>{el.name}</div>
                                {el.name in most_pop && (
                                    <div className={s.count}>{most_pop[el.name].count}</div>
                                )}
                            </div>


                        </Link>
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