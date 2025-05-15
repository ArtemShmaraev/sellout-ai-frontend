import NavbarC from "@/components/shared/NavbarC/NavbarC";
import {useContext, useEffect, useRef} from "react";
import {Context} from "@/context/AppWrapper";
import Footer from "@/components/shared/Footer/Footer";
import ScrollUp from "@/components/shared/ScrollUp/ScrollUp";
import Head from "next/head";

const MainLayout = ({children}) => {
    const {filterStore} = useContext(Context)
    const ref = useRef(null)
    useEffect(() => {
        filterStore.setPageRef(ref)
    }, []);

    return (
        <div ref={ref}>
            <Head>
                <meta name={'description'} content={'Купить кроссовки круто'}/>
            </Head>
            <NavbarC/>
            {children}
            <ScrollUp/>
            <Footer/>
        </div>
    );
};

export default MainLayout;