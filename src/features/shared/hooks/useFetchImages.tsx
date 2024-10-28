"use client";
import { ImagesI } from "@/business/users/interfaces/linkImagesInterface";
import { ownerEndpoints, userEndpoints } from "@/endpointsRouter";
import { useState, useEffect } from "react";
import { fetchDataOfI } from "./useInfiniteScrollObserver";

export default function useFetchImages(
  { fetchDataOf }: fetchDataOfI,
  uid: string
) {
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
      let route = ""; // Establecer un valor predeterminado
      if (fetchDataOf === "ARIANO") {
        route = userEndpoints.getPersonalArianoImagesEndpoint(lastId);
      } else if (fetchDataOf === "FATIMA") {
        route = userEndpoints.getPersonalFatimaImagesEndpoint(lastId);
      } else if (fetchDataOf === "PERSONAL") {
        if (uid === "ax5MY4ZKQoTz1pqpmP4bXOkYw1B3") {
          route = userEndpoints.getPersonalFatimaImagesEndpoint(lastId);
        } else if (uid === "YiWOGI7vVrPzfFIwHaCAS52u1112") {
          route = userEndpoints.getPersonalArianoImagesEndpoint(lastId);
        }
      } else {
        route = userEndpoints.getImagesEndpoint(lastId);
      }
      if (!route) {
        throw new Error("No route defined");
      }

      const response = await fetch(route);
      if (!response.ok) {
        throw new Error("Error fetching images");
      }

      const data = await response.json();
      const { imagesData: newImages, hasMore: moreAvailable } = data;
      console.log(data);
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
