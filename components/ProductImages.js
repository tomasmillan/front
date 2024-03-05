import Image from "next/image";
import { useState } from "react";

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <>
      <div className="text-center">
        <Image className="max-w-full max-h-200" width={500} height={200} src={activeImage} alt="" />
      </div>
      <div className="flex gap-4 mt-4">
        {images.map((image) => (
          <div
            key={image}
            className={`border-2 border-${image === activeImage ? 'gray-300' : 'transparent'} p-2 cursor-pointer rounded-md`}
            onClick={() => setActiveImage(image)}
          >
            <Image width={40} height={40} className="max-w-full max-h-40" src={image} alt="" />
          </div>
        ))}
      </div>
    </>
  );
}
