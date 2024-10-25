"use client";
import { useRef } from "react";
import ImageSkeletor from "../components/ImageSkeletor";
import { FetchingLoader } from "@/features/ui";
import { motion } from "framer-motion";
import { dancing_script, indie_flower, pacifico } from "@/fonts/fonts";
import galleryCss from "@/features/users//css/gallery.module.css";
import { ModalImage, useInfiniteScrollObserver } from "@/features/shared";
import useImageStore from "@/store/imageStore/imageData.store";

function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastImageRef = useRef<HTMLImageElement | null>(null);

  const setSelectedImage = useImageStore((state) => state.setSelectedImage);
  const selectedImage = useImageStore((state) => state.selectedImage);
  const {
    hasMore,
    imagesData,
    isFetchingMore,
    isLoading,
    lastImageRef: imageRef,
  } = useInfiniteScrollObserver({ lastImageRef, scrollContainerRef });

  return (
    <motion.section
      initial={{ opacity: 0, x: -100 }} // Valores iniciales fuera de vista
      whileInView={{ opacity: 1, x: 0 }} // Animación cuando entra en vista
      viewport={{ once: false, amount: 0.0 }} // Configura cómo se activa la animación
      transition={{ duration: 0.5, delay: 0.2 }}
      className="py-5 px-16 max-md:px-12 max-sm:px-8 w-full max-sm:py-16 text-primary-30"
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`${pacifico.className} text-4xl text-center font-bold`}
      >
        Bienvenidos a nuestra galeria
      </motion.h1>
      <div className={`${galleryCss.container}`}>
        {isLoading && imagesData.length === 0
          ? [1, 2, 3].map((_, index) => <ImageSkeletor key={index} />)
          : imagesData.map((image, index) => (
              <div key={index} className={`${galleryCss.box} px-4`}>
                <img
                  key={image.id}
                  src={image.url}
                  alt={image.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                  ref={index === imagesData.length - 1 ? imageRef : null} // Ref en el último elemento
                />
              </div>
            ))}
      </div>
      {isFetchingMore && hasMore && (
        <div className="mt-2">
          <FetchingLoader />
        </div>
      )}
      <ModalImage>
        {selectedImage && (
          <>
            <div
              className={`mb-5 flex items-center ${
                selectedImage.title && selectedImage.date
                  ? "justify-between"
                  : selectedImage.title
                  ? "justify-start"
                  : selectedImage.date
                  ? "justify-end"
                  : "hidden"
              }`}
            >
              {selectedImage.title && (
                <p
                  className={`font-semibold ${dancing_script.className} text-2xl md:text-4xl`}
                >
                  {selectedImage.title}
                </p>
              )}
              {selectedImage.date && (
                <p className="italic font-semibold text-lg md:text-xl">
                  {selectedImage.date}
                </p>
              )}
            </div>
            <div
              className={`flex ${
                selectedImage.description ? "items-center" : "hidden"
              }`}
            >
              {selectedImage.description && (
                <p
                  className={`${indie_flower.className} mt-2 text-xl md:text-2xl`}
                >
                  {selectedImage.description}
                </p>
              )}
            </div>
          </>
        )}
      </ModalImage>
    </motion.section>
  );
}

export default Home;
