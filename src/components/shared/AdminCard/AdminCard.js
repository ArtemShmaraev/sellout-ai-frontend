import React, {useContext, useState} from 'react';
import s from "./AdminCard.module.css";
import shoe from "@/static/img/shoe.png";
import shoe2 from "@/static/img/shoe2.png";
import cross from '@/static/icons/x-lg.svg'
import ScrollableBDropdown from "@/components/shared/UI/ScrollableBDropdown/ScrollableBDropdown";
import {Carousel} from "react-bootstrap";
import Image from "next/image";
import {Context} from "@/context/AppWrapper";
import {observer} from "mobx-react-lite";
import {deleteProduct, updateProduct} from "@/http/productsApi";
import {useRouter} from "next/router";

const AdminCard = ({id, model, brands, colorway, categories, lines, price, mainLine}) => {
    const router = useRouter()
    const {adminStore} = useContext(Context)
    const [disabled, setDisabled] = useState(adminStore.submitDisabled)
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
    const lineDisplay = () => {
        if (lines.length === 1) {
            return lines[0].name
        }
        if (lines.length > 1) {
            let str = lines[0].name
            for (let i = 1; i < lines.length; i++) {
                str += `, ${lines[i].name}`
            }
            return str
        }
    }
    const categoryDisplay = () => {
        if (categories.length === 1) {
            return categories[0].name
        }
        if (categories.length > 1) {
            let str = categories[0].name
            for (let i = 1; i < categories.length; i++) {
                str += `, ${categories[i].name}`
            }
            return str
        }
    }
    const [brand, setBrands] = useState(brandsDisplay(brands))
    const edit = () => {
        adminStore.checkActiveBrands(brands)
        adminStore.checkActiveCategories(categories)
        adminStore.checkActiveLines(lines)
        adminStore.clickEdit()
        setDisabled(false)
    }
    const submit = async () => {
        const data = adminStore.getAllData()
        console.log(data)
        await updateProduct(id, data).then((data) => console.log(data))

        adminStore.clearAll()
        const {path, query} = router
        router.push({path, query}, undefined, {scroll: false})
        adminStore.clickEdit()
        adminStore.clickSubmit()
        setDisabled(true)
    }
    const removeProduct = () => {
        deleteProduct(id).then((data) => console.log(data))
        const {path, query} = router
        router.push({path, query}, undefined, {scroll: false})
    }
    return (
        <div className={s.card}>
            <div className={s.icons_block}>
                <button
                    onClick={edit}
                    disabled={adminStore.editDisabled}
                >Редактировать</button>
                <div className='d-flex align-items-center justify-content-between'
                     onClick={removeProduct}
                >
                    <Image src={cross} alt='' className={s.like}/>
                </div>
            </div>
            <Carousel
                variant='dark'
                indicators={false}
                interval={null}
                slide={false}
            >
                <Carousel.Item>
                    <Image className={s.img}
                         src={shoe} alt="shoe"/>
                </Carousel.Item>
                <Carousel.Item>
                    <Image className={s.img}
                         src={shoe2} alt="shoe"/>
                </Carousel.Item>
            </Carousel>
            <div className='d-flex justify-content-center'>
                <Image src={cross} alt='' className={s.like}/>
            </div>
            <div className={s.text_block}>
                <div
                    className={s.tag}
                >{brand}</div>

                <ScrollableBDropdown toggleText={'Бренд'} isSearch={true} data={adminStore.brands}/>
                <input
                    className={s.name}
                    defaultValue={model}
                    onChange={(e) => adminStore.setModel(e.target.value)}
                />
                <input
                    className={s.name}
                    defaultValue={colorway}
                    onChange={(e) => adminStore.setColorway(e.target.value)}
                />
                <div>От {price}</div>
                <div className='d-flex justify-content-between mb-1 flex-wrap'>
                    <ScrollableBDropdown toggleText={'Категория'} data={adminStore.categories}/>
                    <ScrollableBDropdown toggleText={'Линейка'} data={adminStore.lines}/>
                    <div>
                        <div>Категория: {categoryDisplay()}</div>
                        <div>Линейка: {mainLine}</div>
                    </div>
                </div>
                <div className='d-flex justify-content-center my-3'>
                    <button onClick={submit} disabled={disabled}>
                        Применить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default observer(AdminCard);