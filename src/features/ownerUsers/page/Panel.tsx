"use client";
import { useState } from "react";
import OptionButton from "../components/OptionButton";
import { OptionsI } from "@/interfaces/OptionsI";
import PersonalImages from "../components/PersonalImages";
import OurImages from "../components/OurImages";
import { MdiKeyboardReturn } from "@/features/ui";

type OptionWithoutOptions = Omit<OptionsI, "options">["firstOptions"];
function Panel() {
  const [selectedFirstOption, setSelectedFirstOption] =
    useState<OptionWithoutOptions | null>(null);

  const handleFirstOptionClick = (options: OptionWithoutOptions) => {
    setSelectedFirstOption(options);
  };
  return (
    <section className="flex items-center w-full overflow-y-auto flex-col gap-10">
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1 className="text-2xl text-primary-25 dark:text-primary-20 font-medium">
          Hola mochis,
        </h1>
        <h2 className="text-2xl text-primary-25 dark:text-primary-20 font-medium">
          ¿Que vas a hacer?
        </h2>
        {selectedFirstOption !== null && (
          <div className="text-lg sm:text-2xl text-primary-25 dark:text-primary-20 font-bold flex items-center gap-5 justify-center">
            <button
              onClick={() => setSelectedFirstOption(null)}
              className="rounded-full bg-primary-25 p-1 text-primary-5 hover:bg-primary-10 hover:text-primary-25 transition-all duration-300 ease-in-out"
            >
              <MdiKeyboardReturn />
            </button>
            {selectedFirstOption === "OUR_IMAGES"
              ? "Estas en nuestras imagenes"
              : selectedFirstOption === "PERSONAL_IMAGES"
              ? "Estas en imagenes personales"
              : null}
          </div>
        )}
      </div>
      {selectedFirstOption === null && (
        <div className="flex items-center justify-center gap-10 sm:flex-row">
          <OptionButton
            key={1}
            onClick={() => handleFirstOptionClick("OUR_IMAGES")}
            title="Nuestras imagenes"
            className={`${
              selectedFirstOption === "OUR_IMAGES"
                ? "bg-primary-25 !text-primary-10 border-primary-15"
                : ""
            } rounded-md size-28 bg-primary-15 border border-primary-25 text-primary-25 text-lg font-medium
            hover:bg-primary-25 hover:text-primary-10 hover:border-primary-15 transition-all duration-300 ease-out `}
          />
          <OptionButton
            key={2}
            onClick={() => handleFirstOptionClick("PERSONAL_IMAGES")}
            title="Imagenes personales"
            className={`${
              selectedFirstOption === "PERSONAL_IMAGES"
                ? "bg-primary-25 !text-primary-10 border-primary-15"
                : ""
            } rounded-md size-28 bg-primary-15 border border-primary-25 text-primary-25 text-lg font-medium
            hover:bg-primary-25 hover:text-primary-10 hover:border-primary-15 transition-all duration-300 ease-out  `}
          />
        </div>
      )}

      {selectedFirstOption === null && (
        <h2 className="text-xl text-primary-25 dark:text-primary-20 font-medium">
          ¡Aqui se mostrala lo seleccionado!
        </h2>
      )}
      {selectedFirstOption === "PERSONAL_IMAGES" && <PersonalImages />}
      {selectedFirstOption === "OUR_IMAGES" && <OurImages />}
    </section>
  );
}
export default Panel;
