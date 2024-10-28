"use client";
import { useEffect } from "react";
import useInfiniteScroll from "./useInfiniteScroll";

export type InfiniteScrollObserverT = {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  lastImageRef: React.RefObject<HTMLImageElement>;
};
export type fetchDataOfI = {
  fetchDataOf: "ARIANO" | "FATIMA" | "ALL" | "PERSONAL";
};
export default function useInfiniteScrollObserver({
  lastImageRef,
  scrollContainerRef,
  fetchDataOf,
  uid,
}: InfiniteScrollObserverT & { fetchDataOf: fetchDataOfI } & { uid: string }) {
  const { isFetchingMore, isLoading, imagesData, fetchImages, hasMore } =
    useInfiniteScroll({ scrollContainerRef, fetchDataOf, uid });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !isFetchingMore &&
          !isLoading
        ) {
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
