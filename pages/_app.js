import { CartContextProvider } from "@/components/CartContext";
import Whatsapp from "@/components/icons/whatsapp/Whatsapp";
import '../styles/globals.css'
import Footer from "@/components/Footer";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import TagManager from 'react-gtm-module';
config.autoAddCss = false


export default function App({ Component, pageProps }) {
  
  const tagManagerArgs = {
    gtmId: 'AW-744057013',
    events: {
    sendUserInfo: 'userInfo'
    }
    }
    TagManager.initialize(tagManagerArgs)
  return (
    <>
      <CartContextProvider>
        <Whatsapp />
        <Component {...pageProps} />
        <Footer />
      </CartContextProvider>
    </>
  );
}
