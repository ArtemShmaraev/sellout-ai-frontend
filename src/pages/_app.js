import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css'
import AppWrapper from "@/context/AppWrapper";

export default function App({ Component, pageProps }) {
    return (
        <AppWrapper>
            <Component {...pageProps} />
        </AppWrapper>
    )
}
