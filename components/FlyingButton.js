import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CartContext } from "./CartContext";

export default function FlyingButton({ _id, src, white, ...props }) {
  const { addProduct } = useContext(CartContext);
  const [imagePosition, setImagePosition] = useState({
    display: "none",
    left: 0,
    top: 0,
  });
  const imgRef = useRef(null);

  function sendImageToCart(ev) {
    setImagePosition({
      display: "inline-block",
      left: `${ev.clientX - 50}px`,
      top: `${ev.clientY - 50}px`,
    });
    setTimeout(() => {
      setImagePosition({ ...imagePosition, display: "none" });
    }, 1000);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const reveal = imgRef.current?.closest("div[data-sr-id]");
      if (reveal?.style.opacity === "1") {
        reveal.style.transform = "none";
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onClick={() => addProduct(_id)}
    >
      <button
        className="p-4 bg-gray-500 rounded-lg flex items-center hover:bg-slate-600 text-gray-900 gap-2"
        onClick={sendImageToCart}
        {...props}
      />
      <div
        className="absolute w-16 h-16 rounded-full border-4 border-transparent"
        style={{ ...imagePosition, transition: "opacity 0.5s ease-in-out" }}
      ></div>
    </div>
  );
}
