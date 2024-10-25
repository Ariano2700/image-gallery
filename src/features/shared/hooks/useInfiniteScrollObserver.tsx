"use client";
import { useEffect } from "react";
import useInfiniteScroll from "./useInfiniteScroll";

type InfiniteScrollObserverT = {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  lastImageRef: React.RefObject<HTMLImageElement>;
};
export default function useInfiniteScrollObserver({
  lastImageRef,
  scrollContainerRef,
}: InfiniteScrollObserverT) {
  const { isFetchingMore, isLoading, imagesData, fetchImages, hasMore } =
    useInfiniteScroll({ scrollContainerRef });

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
          fetchImages();
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
  }, [
    fetchImages,
    hasMore,
    isFetchingMore,
    isLoading,
    lastImageRef,
    scrollContainerRef,
  ]);

  return {
    scrollContainerRef,
    lastImageRef,
    isLoading,
    imagesData,
    isFetchingMore,
    hasMore,
  };
}
