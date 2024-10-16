"use client";
import { useEffect, useRef } from "react";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import ImageSkeletor from "../components/ImageSkeletor";
import { FetchingLoader } from "@/features/ui";

function IndexPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { isFetchingMore, isLoading, imagesData, fetchImages, hasMore } =
    useInfiniteScroll({ scrollContainerRef });

  // Ref para el último elemento (última imagen)
  const lastImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !isFetchingMore &&
          !isLoading
        ) {
          console.log(
            "El último elemento es visible, cargando más imágenes..."
          );
          if (hasMore === true) {
            fetchImages();
          } else {
            console.log(hasMore);
          }
        }
      },
      {
        root: scrollContainerRef.current,
        rootMargin: "2px",
      }
    );

    const currentRef = lastImageRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [fetchImages, hasMore, isFetchingMore, isLoading]);

  return (
    <section className="text-white">
      <h1 className="text-2xl">Bienvenidos a nuestra galeria</h1>
      {/* <div className="w-1/2 flex flex-col items-center gap-6 overflow-y-auto py-5"> */}
      <div className="overflow-y-auto w-full max-w-[1100px] m-auto mt-14 mb-14 grid grid-cols-4 grid-rows-[250px] gap-5">
        {isLoading && imagesData.length === 0
          ? [1, 2, 3].map((_, index) => <ImageSkeletor key={index} />)
          : imagesData.map((image, index) => (
              <img
                key={image.id}
                src={image.url}
                alt={image.id}
                //className="w-1/2 rounded-md"
                className="w-full h-full object-cover"
                ref={index === imagesData.length - 1 ? lastImageRef : null} // Ref en el último elemento
              />
            ))}
      </div>
      {isFetchingMore && hasMore && (
        <div className="mt-2">
          <FetchingLoader />
        </div>
      )}
    </section>
  );
}

export default IndexPage;
