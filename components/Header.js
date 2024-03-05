import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";
import SearchIcon from "@/components/icons/SearchIcon";

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);

  return (
    <header className="bg-blue-900 sticky top-0 z-50 flex flex-col md:flex-row justify-between items-center px-4 py-3 md:px-8 md:py-4">
      <Link href="/" className="text-white text-lg font-bold md:mb-0">
        Orion Aceros
      </Link>
      <div className="flex items-center">
        <button
          className="bg-transparent w-8 h-8 text-white cursor-pointer md:hidden"
          onClick={() => setMobileNavActive((prev) => !prev)}
        >
          <BarsIcon />
        </button>
        <Link className="text-white" href={"/search"}>
          <SearchIcon />
        </Link>
      </div>
      <nav
        className={`${
          mobileNavActive ? "block" : "hidden"
        } py-2 md:flex md:justify-center md:gap-8`}
      >
        <Link href="/" className="text-white block py-2 px-4 hover:bg-blue-600">
          Inicio
        </Link>
        <Link
          href="/products"
          className="text-white block py-2 px-4 hover:bg-blue-600"
        >
          Catálogo
        </Link>
        <Link
          href="/categories"
          className="text-white block py-2 px-4 hover:bg-blue-600"
        >
          Categorías
        </Link>
        <Link
          href="/cart"
          className="text-white block py-2 px-4 hover:bg-blue-600"
        >
          Carrito ({cartProducts.length})
        </Link>
      </nav>
    </header>
  );
}
