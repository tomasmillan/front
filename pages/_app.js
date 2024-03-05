import { CartContextProvider } from "@/components/CartContext";
import Whatsapp from "@/components/icons/whatsapp/Whatsapp";
import '../styles/globals.css'


export default function App({ Component, pageProps }) {
  
  return (
    <>
      <CartContextProvider>
        <Whatsapp />
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}
