import React from "react";
import { useRouter } from "next/router";
import Button from "./Button";

const Modal = ({ onClose, message }) => {
    const router = useRouter(); 

    const handleClose = () => {
      onClose();
      router.push("/thanks");
    };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4">
        <p>{message}</p>
        <Button onClick={handleClose} className="mt-4">Cerrar</Button>
      </div>
    </div>
  );
};

export default Modal;
