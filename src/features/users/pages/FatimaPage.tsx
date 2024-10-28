"use client";
import { motion } from "framer-motion";
import ImageGallery from "../components/ImageGallery";
import { useRef } from "react";
import { montserrat } from "@/fonts/fonts";
import UsersImageOptions from "../components/UsersImageOptions";
function FatimaPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastImageRef = useRef<HTMLImageElement | null>(null);
  return (
    <>
      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
        className={`${montserrat.className} text-3xl font-semibold mt-10 text-primary-30 px-5 text-center dark:text-primary-20`}
      >
        Galeria de Fatima
      </motion.h2>{" "}
      <section className="h-[70%]">
        <ImageGallery
          lastImageRef={lastImageRef}
          scrollContainerRef={scrollContainerRef}
          fetchDataOf={{ fetchDataOf: "FATIMA" }}
        >
          <UsersImageOptions />
        </ImageGallery>
      </section>
    </>
  );
}
export default FatimaPage;
