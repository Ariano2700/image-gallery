"use client";
import galleryCss from "@/features/users//css/gallery.module.css";
import { ModalImage, useInfiniteScrollObserver } from "@/features/shared";
import {
  fetchDataOfI,
  InfiniteScrollObserverT,
} from "@/features/shared/hooks/useInfiniteScrollObserver";
import useImageStore from "@/store/imageStore/imageData.store";
import { FetchingLoader } from "@/features/ui";
import ImageSkeletor from "./ImageSkeletor";

function ImageGallery(
  props: InfiniteScrollObserverT & { children: React.ReactNode } & {
    fetchDataOf: fetchDataOfI;
  }
) {
  const { lastImageRef, scrollContainerRef, children, fetchDataOf } = props;
  const setSelectedImage = useImageStore((state) => state.setSelectedImage);
  const {
    hasMore,
    imagesData,
    isFetchingMore,
    isLoading,
    lastImageRef: imageRef,
  } = useInfiniteScrollObserver({
    lastImageRef,
    scrollContainerRef,
    fetchDataOf,
    uid: "",
  });

  return (
    <>
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
        {imagesData.length === 0 &&
          [1, 2, 3].map((_, index) => <ImageSkeletor key={index} />)}
      </div>
      {isFetchingMore && hasMore && (
        <div className="mt-2">
          <FetchingLoader />
        </div>
      )}
      <ModalImage>{children}</ModalImage>
    </>
  );
}
export default ImageGallery;
