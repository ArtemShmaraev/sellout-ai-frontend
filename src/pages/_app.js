import 'rsuite/dist/rsuite.min.css';
import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AppWrapper from "@/context/AppWrapper";
import {CustomProvider} from "rsuite";
import {ruRU} from "rsuite/locales";

export default function App({ Component, pageProps }) {
  return (
      <AppWrapper>
        <CustomProvider locale={ruRU}>
            <Component {...pageProps} />
        </CustomProvider>
      </AppWrapper>
  )
}
