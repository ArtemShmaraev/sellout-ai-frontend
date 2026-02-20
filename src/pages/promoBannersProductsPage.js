import MainLayout from "@/layout/MainLayout";
import styles from '@/styles/PromoBannersProductsPage.module.css'
import React, {useContext, useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import Image from "next/image";
import PromoBannerProductsPageAboutAndGuarantee
    from "@/components/shared/UI/PromoBannerProductsPageAboutAndGuarantee/PromoBannerProductsPageAboutAndGuarantee";
import PromoBannerProductsPageGiftAndRefDesktop
    from "@/components/shared/UI/PromoBannerProductsPageGiftAndRefDesktop/PromoBannerProductsPageGiftAndRefDesktop";
import PromoBannerProductsPageSocial
    from "@/components/shared/UI/PromoBannerProductsPageSocial/PromoBannerProductsPageSocial";
import PromoBannerProductsPageRef
    from "@/components/shared/UI/PromoBannerProductsPageRef/PromoBannerProductsPageRef";
import PromoBannerProductsPageGiftMobile
    from "@/components/shared/UI/PromoBannerProductsPageGiftMobile/PromoBannerProductsPageGiftMobile";
import PromoBannerMainPageAbout from "@/components/shared/UI/PromoBannerMainPageAbout/PromoBannerMainPageAbout";
import PromoBannerMainPageOffers from "@/components/shared/UI/PromoBannerMainPageOffers/PromoBannerMainPageOffers";


const PromoBannersProductsPage = () => {
    return (
        <MainLayout>
            <div style={{marginTop: '150px'}}>
                <PromoBannerProductsPageAboutAndGuarantee></PromoBannerProductsPageAboutAndGuarantee>
                <PromoBannerProductsPageGiftAndRefDesktop></PromoBannerProductsPageGiftAndRefDesktop>
                <PromoBannerProductsPageSocial></PromoBannerProductsPageSocial>
                <PromoBannerProductsPageRef></PromoBannerProductsPageRef>
                <PromoBannerProductsPageGiftMobile></PromoBannerProductsPageGiftMobile>
                <PromoBannerMainPageAbout></PromoBannerMainPageAbout>
                <PromoBannerMainPageOffers></PromoBannerMainPageOffers>
            </div>
        </MainLayout>
    );
};

export default observer(PromoBannersProductsPage);