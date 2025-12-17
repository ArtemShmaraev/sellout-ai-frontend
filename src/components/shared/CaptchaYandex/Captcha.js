import {InvisibleSmartCaptcha} from '@yandex/smart-captcha';
import {useCallback, useContext, useEffect, useState} from "react";
import Cookies from "js-cookie";
import {$host} from "@/http";
import {Context} from "@/context/AppWrapper";


export async function fetchCaptchaToken(captcha_token = '') {
    const {data} = await $host.get(`user/valid_captcha/${captcha_token}`)
    window.location.reload();

}

const InvisibleCaptcha = ({isValidToken}) => {
    const [token, setToken] = useState('');
    const [visible, setVisible] = useState(!isValidToken);

    const handleChallengeHidden = useCallback(() => setVisible(false), []);

    const handleButtonClick = () => setVisible(true);
    return (
        <>
            <div style={{
                height: '0px',
                }}>
                <InvisibleSmartCaptcha
                    sitekey="ysc1_Mv7mBNR4HtAUi0sNynbQ87jBGypFFDYojn2qA3dC1fe2c235"
                    onSuccess={(token) => {
                        // Сохраняем полученный токен в состоянии компонента
                        setToken(token);
                        fetchCaptchaToken(token)


                    }}
                    onChallengeHidden={handleChallengeHidden}
                    visible={visible}
                    test={true}
                    hideShield={true}
                />
            </div>
        </>
    );
};

export default InvisibleCaptcha;
//
//
// import React, {useContext, useEffect, useRef, useState} from 'react';
// import s from '@/styles/OneProductPage.module.css'
//
//
//
// export const getServerSideProps = async (context) => {
//     const cookies = parse(context.req.headers.cookie || '')
//     const token =
//     const product = await fetchOneProduct(context.params.slug, token)
//     const {id} = product
//     const prices = await fetchPrices(id, token)
//     return {props: {product, prices}}
// }
//
//
//
// const OneProductPage = ({product, prices}) => {
//     const router = useRouter()
//     const [moreOpen, setMoreOpen] = useState(true)
//     const {productStore, userStore, cartStore, desktopStore} = useContext(Context)
//
//     useEffect(() => {
//         const checkIsBot = () => {
//             const userAgent = window.navigator.userAgent;
//             const botRegex = /bot|crawler|spider|googlebot|/i;
//             return botRegex.test(userAgent)
//         }
//         if (!product.actual_platform_price) {
//             const token = Cookies.get('access_token')
//             const {slug} = router.query
//             const interval = setInterval(() => {
//                 console.log('load')
//                 updateOneProduct(slug, token)
//                     .then(product => {
//                         if (product.actual_platform_price) {
//                             console.log('ok')
//                             clearInterval(interval)
//                             const chosenSize = productStore.sizeChosen
//                             if (chosenSize) {
//                                 fetchShippings(product.id, chosenSize.size_for_api, token)
//                                     .then(ships => {
//                                         productStore.setShipps(ships)
//                                         productStore.setAnim(true)
//                                         setTimeout(() => {
//                                             productStore.setAnim(false)
//                                         }, 1000)
//                                     })
//                             }
//                             fetchPrices(product.id, token).then((prices) => {
//                                 const {view_size} = chosenSize
//                                 if (view_size) {
//                                     let foundSelected = false
//                                     prices.forEach(el => {
//                                         if (el.view_size === view_size) {
//                                             productStore.setSizeChosen(el)
//                                             foundSelected = true
//                                         }
//                                     })
//                                     if (!foundSelected) {
//                                         productStore.setSizeChosen(null)
//                                     }
//                                 }
//                                 router.push(`${router.asPath}`, undefined, {scroll: false})
//                             })
//                         }
//                     })
//                     .catch(err => console.log(err))
//             }, 4000)
//
//             return () => {
//                 clearInterval(interval)
//                 productStore.setAnim(false)
//             }
//         }
//     }, [router.asPath])
//
//
//
//
//
//
//     return (
//         <MainLayout>
//             <InvisibleCaptcha/>
//             <div className={s.container + ' custom_cont'}>
//                 <div className={s.row}>
//                     <div className={s.col1}>
//                         <div className={s.more} style={moreOpen ? {height: 'fit-content'} : {height: '200px'}}
//                              ref={infoRef}>
//                             {!desktopStore.isDesktop && <hr/>}
//                             <div className={s.row}>
//                                 <div className={s.col50}>
//                                     {!desktopStore.isDesktop && <BreadcrumbC list={product.list_lines}/>}
//                                     <div className={s.model}>{product.model}</div>
//                                     <div className={s.more_color}>{product.colorway}</div>
//                                     <div className={s.more_color}>{parseHtml(product.extra_name)}</div>
//                                     <p className={s.description}>
//                                         {product.description}
//                                     </p>
//                                 </div>
//                                 <div className={s.col50}>
//                                     <div className={s.characteristics_title}>Характеристики товара:</div>
//                                     {renderParams()}
//                                 </div>
//                             </div>
//                         </div>
//
//                     </div>
//                 </div>
//             </div>
//
//         </MainLayout>
//     );
// };
//
// export default observer(OneProductPage);