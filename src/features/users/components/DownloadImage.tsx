"use client";
import { ImagesI } from "@/business/users/interfaces/linkImagesInterface";
import { MaterialSymbolsDownload, RiLoader2Fill } from "@/features/ui";
import { useState } from "react";

type PropsI = {
  selectedImage: ImagesI;
};
function DownloadImage(props: PropsI) {
  const [isDownloading, setIsDownloading] = useState(false);
  const { selectedImage } = props;
  const downloadImage = (url: string) => {
    setIsDownloading(true);
    // Agregar un retraso de 500 ms antes de iniciar la descarga
    fetch(url, {
      mode: "cors",
    })
      .then((response) => response.blob()) // Obtener los datos como un blob
      .then((blob) => {
        const urlBlob = window.URL.createObjectURL(blob); // Crear URL a partir del blob
        const a = document.createElement("a");
        a.href = urlBlob;
        a.download = `${
          selectedImage.title ? selectedImage.title : selectedImage.id
        }.png`;
        document.body.appendChild(a);
        a.click(); // Simular el click
        document.body.removeChild(a);
      })
      .catch((err) => console.error("Error al descargar la imagen:", err))
      .finally(() => {
        setTimeout(() => {
          setIsDownloading(false);
        }, 1000);
      });
  };
  return (
    <button
      onClick={() => downloadImage(selectedImage.url)}
      className={`p-2 rounded-md flex items-center justify-center bg-primary-25 text-primary-10 hover:bg-primary-30 transition-all duration-500`}
    >
      {isDownloading ? (
        <RiLoader2Fill className="text-2xl animate-spin" />
      ) : (
        <MaterialSymbolsDownload className="text-2xl" />
      )}{" "}
    </button>
  );
}
export default DownloadImage;
