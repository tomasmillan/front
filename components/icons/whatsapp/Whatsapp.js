import React from "react";
import Image from "next/image";
import Link from "next/link";

const FloatButton = () => {
  return (
    <button className="fixed right-4 bottom-5 z-10">
      {" "}
      <Link
        href="https://api.whatsapp.com/send?phone=541134826691"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        {" "}
        <div>
          {" "}
          <Image
            src="https://img.icons8.com/color/512/whatsapp--v1.png"
            alt="Contactar por whatsapp"
            width={80}
            height={80}
            priority
          />{" "}
        </div>{" "}
      </Link>{" "}
    </button>
  );
};

export default FloatButton;
