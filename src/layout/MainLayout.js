import NavbarC from "@/components/shared/NavbarC/NavbarC";
import {useContext, useEffect} from "react";
import {Context} from "@/context/AppWrapper";

const MainLayout = ({children}) => {
    const {desktopStore} = useContext(Context)
    useEffect(() => {
        const width = window.innerWidth
        if (width <= 1000) {
            desktopStore.setIsDesktop(false)
        }
    }, [])
    return (
        <>
            <NavbarC/>
            {children}
        </>
    );
};

export default MainLayout;