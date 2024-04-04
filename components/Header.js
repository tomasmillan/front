import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";
import SearchIcon from "@/components/icons/SearchIcon";
import Image from "next/image";

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);

  return (
    <header className="bg-gray-900 sticky top-0 z-50 flex flex-col md:flex-row justify-between items-center px-4 py-3 md:px-8 md:py-4">
      <Link href="/" className="text-white text-lg font-bold md:mb-0">
        <Image src="https://i.ibb.co/TRMH9fz/logo-removebg-preview.png" alt="Orion Aceros" width={273} height={75} />
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
        <Link href="/" className="text-white block py-2 px-4 hover:bg-gray-600 rounded-sm">
          Inicio
        </Link>
        <Link
          href="/products"
          className="text-white block py-2 px-4 hover:bg-gray-600 rounded-sm"
        >
          Catálogo
        </Link>
        <Link
          href="/categories"
          className="text-white block py-2 px-4 hover:bg-gray-600 rounded-sm"
        >
          Categorías
        </Link>
        <Link
          href="/cart"
          className="text-white block py-2 px-4 hover:bg-gray-600 rounded-sm"
        >
          Carrito ({cartProducts.length})
        </Link>
      </nav>
    </header>
  );
}
