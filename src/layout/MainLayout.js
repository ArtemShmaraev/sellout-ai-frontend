import NavbarC from "@/components/shared/NavbarC/NavbarC";
import {useContext, useEffect} from "react";
import {Context} from "@/context/AppWrapper";
import Footer from "@/components/shared/Footer/Footer";
import ScrollUp from "@/components/shared/ScrollUp/ScrollUp";

const MainLayout = ({children}) => {
    const {desktopStore} = useContext(Context)
    useEffect(() => {
        const width = window.innerWidth
        if (width <= 1000) {
            desktopStore.setIsDesktop(false)
        }
    }, [])
    return (
        <div style={{overflowY: 'scroll', overflowX: 'hidden', height: '100vh', position: "relative"}}>
            <NavbarC/>
            {children}
            <ScrollUp/>
            <Footer/>
        </div>
    );
};

export default MainLayout;