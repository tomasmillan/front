import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faWhatsappSquare,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="bg-gray-400 text-white">
      <div className="container mx-auto mt-2 px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Columna 1: Información de contacto */}
        <div className="">
          <h3 className="text-xl font-semibold mb-4">
            Información de contacto
          </h3>
          <p>SOLO VENTA MAYORISTA - ENTREGAS EN CAPITAL y GBA</p>
          <p>Teléfono: <Link href="tel:+541148025200">011 4802-5200</Link></p>
          <p>
            Dirección: Grito de ascensio 3321 - Capital Federal, C.A.B.A,
            Argentina.
          </p>
        </div>

        {/* Columna 2: Enlaces importantes */}
        <div className="">
          <h3 className="text-xl font-semibold mb-4">Enlaces importantes</h3>
          <ul>
            <li>
              <Link href="/" className="underline">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/about" className="underline">
                Acerca de nosotros{" "}
              </Link>
            </li>
            <li>
              <Link href="/products" className="underline">
                Productos{" "}
              </Link>
            </li>
            <li>
              <Link href="/cart" className="underline">
                Carrito{" "}
              </Link>
            </li>
          </ul>
        </div>

        {/* Columna 3: Redes sociales y botón de volver al inicio */}
        <div className="">
          {/* <h3 className="text-xl font-semibold mb-4">Redes sociales</h3>
          <div className="mb-4">
            <div className="w-100 h-100">
              <Link href="#" className="mr-4">
                <FontAwesomeIcon icon={faInstagram} />
              </Link>
            </div>
            <Link href="#" className="mr-4">
              <FontAwesomeIcon icon={faWhatsappSquare} />
            </Link>
            <Link href="#" className="mr-4">
              <FontAwesomeIcon icon={faFacebookF} />
            </Link>
          </div> */}
          <Link className="text-xl underline" href="/">
            Volver al inicio
          </Link>
        </div>
      </div>

      {/* Pie de página */}
      <div className="flex justify-center align-center py-4 bg-black text-white">
        Desarrollada por{" "}
        <Link
          href="https://tomasmillan96b387.myportfolio.com/work"
          className="underline"
        >
          TML
        </Link>
      </div>
    </div>
  );
};

export default Footer;
