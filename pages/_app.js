import { CartContextProvider } from "@/components/CartContext";
import Whatsapp from "@/components/icons/whatsapp/Whatsapp";
import '../styles/globals.css'
import Footer from "@/components/Footer";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false


export default function App({ Component, pageProps }) {
  
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
