"use client";
import { MaterialSymbolsCloseRounded } from "@/features/ui";
import useImageStore from "@/store/imageStore/imageData.store";
import { motion } from "framer-motion";

type ModalImageT = {
  children: React.ReactNode;
  isEdited?: boolean;
};
function ModalImage({ children, isEdited }: ModalImageT) {
  const setSelectedImage = useImageStore((state) => state.setSelectedImage);
  const selectedImage = useImageStore((state) => state.selectedImage);

  const closeModal = () => {
    setSelectedImage(null);
  };
  return (
    <>
      {selectedImage && (
        <motion.div
          layout
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            ease: "easeInOut",
            duration: 0.1,
          }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 py-3"
        >
          <button
            className="fixed top-0 right-5 p-2 mt-4 mr-3 rounded-full bg-primary-25 text-primary-15 hover:bg-danger hover:text-white transition-all ease-in-out duration-300"
            onClick={closeModal}
          >
            <MaterialSymbolsCloseRounded className="text-3xl" />
          </button>
          <div className="flex flex-col items-center justify-center h-4/6">
            <img
              src={selectedImage.url}
              alt="Selected image"
              className={`${
                isEdited === true ? "w-2/3" : "w-11/12"
              } sm:w-full sm:h-full object-contain rounded-tr-md rounded-tl-md`}
            />
            <div
              className={`bg-slate-100 ${
                isEdited === true ? "w-2/3" : "w-11/12"
              } sm:w-full sm:h-full text-black p-6 rounded-br-sm rounded-bl-sm`}
            >
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
export default ModalImage;
