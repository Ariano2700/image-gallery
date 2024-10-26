"use client";
import { ImagesI } from "@/business/users/interfaces/linkImagesInterface";
import { FetchingLoader } from "@/features/ui";
import ImageSkeletor from "@/features/users/components/ImageSkeletor";
import { useRef } from "react";
import {
  ConfirmAlert,
  ErrorAlert,
  ModalImage,
  SuccessAlert,
  useInfiniteScrollObserver,
} from "@/features/shared";
import useImageStore from "@/store/imageStore/imageData.store";

function EditImages() {
  const setSelectedImage = useImageStore((state) => state.setSelectedImage);
  const selectedImage = useImageStore((state) => state.selectedImage);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastImageRef = useRef<HTMLImageElement>(null);

  const {
    hasMore,
    imagesData,
    isFetchingMore,
    isLoading,
    lastImageRef: imageRef,
  } = useInfiniteScrollObserver({ lastImageRef, scrollContainerRef });

  const handleEdit = async (image: ImagesI) => {
    try {
      const response = await fetch(`/api/ownerUsers/patch`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(image),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la imagen.");
      }

      SuccessAlert({ title: "Imagen actualizada exitosamente." });
      setSelectedImage(null);
    } catch (error) {
      console.error("Error al actualizar la imagen:", error);
      ErrorAlert({ error: "Hubo un error al actualizar la imagen." });
    }
  };

  const handleDelete = (imageId: string) => {
    if (!imageId) return;

    ConfirmAlert(async () => {
      try {
        // Aquí llamas a tu método para eliminar la imagen desde Firestore
        const response = await fetch(`/api/ownerUsers/delete/${imageId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          ErrorAlert({ error: "Hubo un error al eliminar la imagen." });
          throw new Error("Error al eliminar la imagen.");
        }

        SuccessAlert({
          title:
            "Imagen eliminada exitosamente. Reiniciar la pagina para corroborar wajaja",
        });
      } catch (error) {
        console.error("Error al eliminar la imagen:", error);
        ErrorAlert({ error: "Hubo un error al eliminar la imagen." });
      }
    });
  };

  return (
    <div className="py-5 px-16 max-md:px-12 max-sm:px-8 w-full max-sm:py-16">
      <div className={`grid place-items-center grid-cols-2 md:grid-cols-4`}>
        {isLoading && imagesData.length === 0
          ? [1, 2, 3, 4].map((_, index) => (
              <div key={index} className="flex  gap-6 w-full">
                <ImageSkeletor key={index} />
              </div>
            ))
          : imagesData.map((image, index) => (
              <div key={index} className={`flex flex-col flex-wrap px-4`}>
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
      <ModalImage isEdited={true}>
        {selectedImage && (
          <>
            <div className="mb-3 flex flex-col items-center">
              <div className="flex flex-col  justify-between">
                <input
                  type="text"
                  value={selectedImage.title || ""}
                  onChange={(e) =>
                    setSelectedImage({
                      ...selectedImage,
                      title: e.target.value,
                    })
                  }
                  className="mb-2 p-2 border border-gray-300 rounded"
                  placeholder="Título"
                />
                <input
                  type="date"
                  value={selectedImage.date || ""}
                  onChange={(e) =>
                    setSelectedImage({ ...selectedImage, date: e.target.value })
                  }
                  className="mb-2 p-2 border border-gray-300 rounded"
                />
              </div>
              <input
                type="text"
                value={selectedImage.description || ""}
                onChange={(e) =>
                  setSelectedImage({
                    ...selectedImage,
                    description: e.target.value,
                  })
                }
                className="mb-2 p-2 border border-gray-300 rounded w-full"
                placeholder="Descripción"
              />
            </div>
            <div className="mt-4 flex gap-4 justify-center">
              <button
                className="bg-primary-25 text-white px-4 py-2 rounded-md hover:bg-primary-30 transition-all"
                onClick={() => handleEdit(selectedImage)}
              >
                Guardar Cambios
              </button>
              <button
                className="bg-danger text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
                onClick={() => handleDelete(selectedImage.id)}
              >
                Eliminar
              </button>
            </div>
          </>
        )}
      </ModalImage>
    </div>
  );
}
export default EditImages;
