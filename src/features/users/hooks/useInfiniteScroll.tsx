"use client";
import { useEffect, useState } from "react";
import useFetchImages from "./useFetchImages";

interface useInfiniteScrollI {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

export default function useInfiniteScroll({
  scrollContainerRef,
}: useInfiniteScrollI) {
  const { fetchImages, isFetchingMore, isLoading, imagesData, hasMore } =
    useFetchImages();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      // Verificamos si estamos cerca del final
      const isBottomReached =
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 10; // Cambiamos el margen a 100px

      if (isBottomReached && hasMore && !isFetchingMore && !isLoading) {
        // Solo si no estamos en medio de una carga y aún hay más contenido
        setIsFetching(true);
        fetchImages();
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isFetchingMore, isLoading, hasMore, fetchImages]);

  // Aseguramos que `isFetching` se desactiva cuando termina la carga
  useEffect(() => {
    if (!isLoading && !isFetchingMore) {
      setIsFetching(false);
    }
  }, [isLoading, isFetchingMore]);

  return {
    isLoading,
    isFetchingMore,
    imagesData,
    fetchImages,
    isFetching,
    hasMore,
  };
}
