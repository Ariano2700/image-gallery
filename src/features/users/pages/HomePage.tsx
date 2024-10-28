"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { montserrat, pacifico } from "@/fonts/fonts";
import OurSpotifyData from "../components/OurSpotifyData";
import ImageGallery from "../components/ImageGallery";
import UsersImageOptions from "../components/UsersImageOptions";

function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastImageRef = useRef<HTMLImageElement | null>(null);
  return (
    <motion.section
      initial={{ opacity: 0, x: -100 }} // Valores iniciales fuera de vista
      whileInView={{ opacity: 1, x: 0 }} // Animación cuando entra en vista
      viewport={{ once: false, amount: 0.0 }} // Configura cómo se activa la animación
      transition={{ duration: 0.5, delay: 0.2 }}
      className="py-1 px-16 max-md:px-12 max-sm:px-8 w-full max-sm:py-16 text-primary-30 dark:text-primary-20"
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
        className={`${pacifico.className} text-5xl font-bold mb-10 text-center md:text-start max-sm:-mt-12`}
      >
        Bienvenidos a nuestra pagina
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
        className="w-full"
      >
        <h2
          className={`${montserrat.className} text-3xl font-semibold mb-5 text-green-600 px-5 text-center dark:text-green-400`}
        >
          Nuestro Spotify
        </h2>{" "}
        <OurSpotifyData />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
        className={`${montserrat.className} text-3xl font-semibold mt-10 text-primary-30 px-5 text-center dark:text-primary-20`}
      >
        Nuestra galeria
      </motion.h2>{" "}
      <ImageGallery
        lastImageRef={lastImageRef}
        scrollContainerRef={scrollContainerRef}
        fetchDataOf={{ fetchDataOf: "ALL" }}
      >
        <UsersImageOptions />
      </ImageGallery>
    </motion.section>
  );
}

export default Home;
