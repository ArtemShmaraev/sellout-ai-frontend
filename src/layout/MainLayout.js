import NavbarC from "@/components/shared/NavbarC/NavbarC";
import {useContext, useEffect, useRef} from "react";
import {Context} from "@/context/AppWrapper";
import Footer from "@/components/shared/Footer/Footer";
import ScrollUp from "@/components/shared/ScrollUp/ScrollUp";

const MainLayout = ({children}) => {
    const {filterStore} = useContext(Context)
    const ref = useRef(null)
    useEffect(() => {
        filterStore.setPageRef(ref)
    }, []);
    return (
        <div style={{overflowY: 'scroll', overflowX: 'hidden', height: '100vh', position: "relative"}} ref={ref}>
            <NavbarC/>
            {children}
            <ScrollUp/>
            <Footer/>
        </div>
    );
};

export default MainLayout;