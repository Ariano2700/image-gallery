"use client";
import { useState } from "react";
import OptionButton from "../components/OptionButton";
import UploadCard from "../components/UploadCard";
import EditImages from "../components/EditImages";

interface OptionsI {
  options: "UPLOAD_IMAGE" | "EDIT_IMAGE";
}
function Panel() {
  // Estado para manejar la opción seleccionada
  const [selectedOption, setSelectedOption] = useState<
    OptionsI["options"] | null
  >(null);

  // Función para manejar cuando se selecciona una opción
  const handleOptionClick = ({ options }: OptionsI) => {
    setSelectedOption(options);
  };
  return (
    <section className="flex items-center w-full overflow-y-auto flex-col gap-10">
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1 className="text-2xl text-primary-25 font-medium">Hola mochis,</h1>
        <h2 className="text-2xl text-primary-25 font-medium">
          ¿Que vas a hacer?
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center gap-10 sm:flex-row">
        <OptionButton
          key={1}
          onClick={() => handleOptionClick({ options: "UPLOAD_IMAGE" })}
          title="Subir una imagen"
          className={`${
            selectedOption === "UPLOAD_IMAGE"
              ? "bg-primary-25 !text-primary-10 border-primary-15"
              : ""
          }`}
        />
        <OptionButton
          key={2}
          onClick={() => handleOptionClick({ options: "EDIT_IMAGE" })}
          title="Editar imagenes"
          className={`${
            selectedOption === "EDIT_IMAGE"
              ? "bg-primary-25 !text-primary-10 border-primary-15"
              : ""
          }`}
        />
      </div>

      {selectedOption === null && (
        <h2 className="text-xl text-primary-25 font-medium">
          ¡Aqui se mostrala lo seleccionado!
        </h2>
      )}
      {selectedOption === "UPLOAD_IMAGE" && <UploadCard />}

      {selectedOption === "EDIT_IMAGE" && <EditImages />}
    </section>
  );
}
export default Panel;
