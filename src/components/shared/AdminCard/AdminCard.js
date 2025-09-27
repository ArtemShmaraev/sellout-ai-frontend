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
import {deletePhoto, deleteProduct, updateProduct} from "@/http/productsApi";
import {useRouter} from "next/router";
import truck from "@/static/icons/truck.svg";
import re from "@/static/icons/arrow-return-left.svg";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import Link from "next/link";

const AdminCard = ({categories, lines, mainLine, key, cardList, product}) => {
    const router = useRouter()
    const {adminStore} = useContext(Context)
    const [disabled, setDisabled] = useState(adminStore.submitDisabled)
    const {id, model, slug, brands, collab, colorway, price} = product
    const isFastShip = product.is_fast_shipping
    const isReturn = product.is_return
    const isSale = product.is_sale
    const sale = product.sale_amount ?? ''
    const inWishlist = product.in_wishlist
    const photosArr = product.bucket_link
    const brandsDisplay = () => {
        if (collab) {
            return collab.name
        } else {
            return brands.length ? brands[0].name : 'no brand'
        }
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
    const [brand, setBrands] = useState(brandsDisplay())
    const edit = () => {
        adminStore.checkActiveBrands(product.brands)
        adminStore.checkActiveCategories(product.categories)
        adminStore.checkActiveLines(product.lines)
        adminStore.clickEdit()
        setDisabled(false)
    }
    const submit = async () => {
        const data = adminStore.getAllData()
        updateProduct(id, data)
        adminStore.clearAll()
        const {path, query} = router
        router.push({path, query}, undefined, {scroll: false})
        adminStore.clickEdit()
        adminStore.clickSubmit()
        setDisabled(true)
    }
    const removeProduct = () => {
        deleteProduct(id).then((data) => console.log(data))
        //TODO убрать console.log
        const {path, query} = router
        router.push({path, query}, undefined, {scroll: false})
    }
    const [photoId, setPhotoId] = useState(photosArr[0]?.id)
    const removePhoto = () => {
        deletePhoto(id, photoId).then((data) => console.log(data))
        //TODO убрать console.log
        const {path, query} = router
        router.push({path, query}, undefined, {scroll: false})
    }
    const copyLink = async () => {
        const host = location.host
        await navigator.clipboard.writeText(`${host}/products/${product.slug}`)
    }
    const addSpacesToNumber = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return (
        <div className={s.card_list}>
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
            <div style={{display: 'flex', alignItems: 'center'}}>
                {isSale && <div className={s.sale}>
                    -{Math.ceil(100 - (price.final_price/price.start_price) * 100)}%
                </div>}
                {isFastShip && <Image src={truck} alt="shippment" className={s.truck}/>}
                {isReturn && <Image src={re} alt="shippment" className={s.truck}/>}
            </div>
            <Carousel
                variant='dark'
                indicators={false}
                interval={null}
                slide={false}
                onSlide={(eventKey) => {
                    setPhotoId(photosArr[eventKey]?.id)
                }}
            >
                {
                    photosArr.map(el =>

                        <Carousel.Item className={s.image_container}>
                            <Link href={`/products/${product.slug}`}>
                                <Image src={el.url} alt='' fill={true} style={{objectFit: "contain"}}
                                />
                            </Link>
                        </Carousel.Item>
                    )
                }
            </Carousel>
            <div className='d-flex justify-content-center'>
                <Image src={cross} alt='' className={s.like} onClick={removePhoto}/>
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
                {
                    isSale
                        ?
                        <div className={`${s.price}`}>
                            <span className={s.crossed}>От {addSpacesToNumber(price.start_price)} ₽</span>
                            <span className={s.sale_price}>От {addSpacesToNumber(price.final_price)} ₽</span>
                        </div>
                        :
                        <div className={`${s.price}`}>От {addSpacesToNumber(price.final_price)} ₽</div>
                }
                <div className='d-flex justify-content-between mb-1 flex-wrap'>
                    <ScrollableBDropdown toggleText={'Категория'} data={adminStore.categories}/>
                    <ScrollableBDropdown toggleText={'Линейка'} data={adminStore.lines}/>
                    <div>
                        <div>spu_id: {product.spu_id}</div>
                        <div>likes_count: {product.rel_num}</div>
                        <div>normalize likes_count: {product.normalize_rel_num}</div>
                        <div>+likes: {product.likes_month}</div>
                        <div>score: {product.score_product_page}</div>
                        <div>category_id: {product.category_id}</div>
                        <div>category_name: {product.category_name}</div>
                        <div>level1_category_id: {product.level1_category_id}</div>
                        <div>level2_category_id: {product.level2_category_id}</div>
                        <div>title: {product.platform_info?.poizon?.title}</div>
                        <div>title: {product.up_score}</div>
                        {/*<div>Линейка: {product.main_line.name}</div>*/}
                    </div>
                </div>
                <div className='d-flex justify-content-center my-3'>
                    <button onClick={copyLink}>
                        Ссылка
                    </button>
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