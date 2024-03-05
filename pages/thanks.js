import Header from "@/components/Header";
import Center from "@/components/Center";
import Image from "next/image";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <Center>
        <div className="bg-white rounded-lg p-8 max-w-full flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold">¡Gracias por tu compra!</h1>
          <div className="flex flex-col justify-center items-center">
            <Image
              src="https://img.freepik.com/vector-premium/gente-celebrando-hombres-mujeres-jovenes-bailan-fiesta-celebracion-globos-alegres-e-ilustracion-confeti_102902-1816.jpg"
              alt="error"
              width={400}
              height={400}
              className="w-80 m-3"
            />
          </div>
          <p className="text-center">Te hemos enviado un correo con los detalles de tu pedido.</p>
          <div className="p-4">
            <Link href="/" className="p-2 text-white bg-gray-800 rounded-lg flex justify-center items-center text-center border border-black hover:bg-black hover:p-3">
              Regresar al inicio
            </Link>
          </div>
        </div>
      </Center>
    </>
  );
}
