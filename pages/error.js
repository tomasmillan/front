import Header from "@/components/Header";
import Center from "@/components/Center";
import Image from "next/image";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <Center>
        <div className="bg-white rounded-lg p-8 max-w-full flex justify-center flex-col items-center">
          <h1>¡Ha habido un error!</h1>
          <div className="flex justify-center flex-col items-center">
            <Image
              src="https://img.freepik.com/vector-gratis/pequenas-personas-que-examinan-advertencia-error-sistema-operativo-pagina-web-aislaron-ilustracion-plana_74855-11104.jpg?size=626&ext=jpg&ga=GA1.1.1879863893.1698086799&semt=sph"
              alt="error"
              width={400} height={400}
              className="w-80 m-3"
            />
          </div>
          <p>Hubo un problema, por favor inténtelo de nuevo.</p>
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
