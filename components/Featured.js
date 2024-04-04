import ButtonLink from "@/components/ButtonLink";
import CartIcon from "@/components/icons/CartIcon";
import FlyingButton from "@/components/FlyingButton";
import { Fade, Slide } from "react-awesome-reveal";
import Image from "next/image";

export default function Featured({ product }) {
  return (
    <div className="bg-gray-600 text-white py-12">
       <div className="flex align-center justify-center my-5">
          <p className="text-3xl text-black font-extrabold pb-4">SOLO VENTA MAYORISTA - ENTREGAS EN CAPITAL Y GBA</p>
        </div>
      <div className="max-w-4xl mx-auto px-4">
       
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <Slide direction="left" delay={50}>
              <div>
                <h1 className="text-2xl md:text-4xl font-normal">
                  {product.title}
                </h1>
                <p className="text-sm md:text-base text-black">
                  {product.description}
                </p>
                <div className="flex gap-4 mt-5 items-center justify-evenly">
                  <ButtonLink
                    className="underline p-2 hover:text-gray-900"
                    href={"/product/" + product._id}
                    outline={1}
                    white={1}
                  >
                    Saber más
                  </ButtonLink>
                  <FlyingButton
                    white={1}
                    _id={product._id}
                    src={product.images?.[0]}
                  >
                    <CartIcon />
                    Agregar al carrito
                  </FlyingButton>
                </div>
              </div>
            </Slide>
          </div>
          <div>
            <Fade delay={0}>
              <div className="flex items-center justify-center">
                <Image
                  src={product.images?.[0]}
                  width={400}
                  height={300}
                  alt=""
                />
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </div>
  );
}
