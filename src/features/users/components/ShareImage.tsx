"use client";
import { ImagesI } from "@/business/users/interfaces/linkImagesInterface";
import { MaterialSymbolsShare } from "@/features/ui";
import { useState } from "react";

type PropsI = {
  selectedImage: ImagesI;
};
function ShareImage(props: PropsI) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { selectedImage } = props;
  const handleCopy = () => {
    const photoURL = selectedImage.url;
    navigator.clipboard.writeText(photoURL).catch((error) => {
      console.error("Error al copiar el enlace: ", error);
    });
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
  return (
    <button
      onClick={handleCopy}
      className={`p-2 bg-primary-25 text-primary-10 hover:bg-primary-30 rounded focus:outline-none transition-all duration-500 flex justify-center`}
    >
      {isCopied === true ? (
        "¡Copiado!"
      ) : (
        <MaterialSymbolsShare className="text-2xl" />
      )}
    </button>
  );
}
export default ShareImage;
