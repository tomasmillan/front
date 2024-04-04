import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";
import { primary } from "@/lib/colors";
import FlyingButton from "@/components/FlyingButton";
import HeartOutlineIcon from "@/components/icons/HeartOutlineIcon";
import HeartSolidIcon from "@/components/icons/HeartSolidIcon";
import axios from "axios";
import Image from "next/image";

export default function ProductBox({
  _id,
  title,
  description,
  price,
  images,
  wished = false,
  onRemoveFromWishlist = () => {},
}) {
  const url = "/product/" + _id;
  const [isWished, setIsWished] = useState(wished);

  function addToWishlist(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const nextValue = !isWished;
    if (nextValue === false && onRemoveFromWishlist) {
      onRemoveFromWishlist(_id);
    }
    setIsWished(nextValue);
  }

  return (
    <div className="relative">
      <Link
        href={url}
        className="bg-white p-5 rounded-lg flex items-center justify-center w-200 h-200"
      >
        <button
          className={`w-10 h-10 p-2 absolute top-0 right-0 bg-transparent border-0 cursor-pointer ${
            isWished ? "text-red-500" : "text-black"
          }`}
          onClick={addToWishlist}
        >
          {isWished ? <HeartSolidIcon /> : <HeartOutlineIcon />}
        </button>
        <Image width={200} height={200} src={images?.[0]} alt="" />
      </Link>
      <div className="mt-4">
        <Link href={url} className="font-normal text-sm text-black">
          {title}
        </Link>
        <div className="flex items-center justify-between mt-2">
          <p className="text-lg font-normal">${price}</p>
          <FlyingButton white={1} _id={_id} className="bg-gray-400 rounded-md p-2 hover:bg-slate-600 delay-200 hover:text-white">
            Agregar al Carrito
          </FlyingButton>
        </div>
      </div>
    </div>
  );
}
