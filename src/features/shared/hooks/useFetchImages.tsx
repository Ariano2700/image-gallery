"use client";
import { ImagesI } from "@/business/users/interfaces/linkImagesInterface";
import { useState, useEffect } from "react";

export default function useFetchImages() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [lastId, setLastId] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [imagesData, setImagesData] = useState<ImagesI[]>([]);

  // Llamada inicial para cargar las primeras imágenes
  useEffect(() => {
    if (imagesData.length === 0) {
      fetchImages(); // Evitamos múltiples llamadas iniciales
    }
  }, []);

  const fetchImages = async () => {
    if (isFetchingMore || isLoading || !hasMore) return;

    setIsFetchingMore(true);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/users/get?lastId=${lastId}&limit=2`);
      if (!response.ok) {
        throw new Error("Error fetching images");
      }

      const data = await response.json();
      const { imagesData: newImages, hasMore: moreAvailable } = data;

      if (newImages.length > 0) {
        setImagesData((prev) => {
          const existingImageIds = prev.map((v) => v.id);
          const uniqueImages = newImages.filter(
            (img: ImagesI) => !existingImageIds.includes(img.id)
          );
          return [...prev, ...uniqueImages];
        });
        setLastId(newImages[newImages.length - 1].id);
        setHasMore(moreAvailable); // Asegúrate de establecer esto correctamente
      } else {
        setHasMore(false); // Si no hay nuevas imágenes, establece esto a false
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setIsFetchingMore(false);
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isFetchingMore,
    imagesData,
    fetchImages,
    hasMore,
  };
}
