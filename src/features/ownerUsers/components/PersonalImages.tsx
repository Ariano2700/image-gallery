"use client";
import { OptionsI } from "@/interfaces/OptionsI";
import OptionButton from "./OptionButton";
import { useEffect, useState } from "react";
import UploadCard from "./UploadCard";
import EditImages from "./EditImages";
import { ownerEndpoints } from "@/endpointsRouter";
type OptionWithoutFirstOptions = Omit<OptionsI, "firstOptions">["options"];
function PersonalImages() {
  const [uid, setUid] = useState<string>("");
  // Estado para manejar la opción seleccionada
  const [selectedOption, setSelectedOption] =
    useState<OptionWithoutFirstOptions | null>(null);

  const handleOptionClick = (options: OptionWithoutFirstOptions) => {
    setSelectedOption(options);
  };

  useEffect(() => {
    const getUid = async () => {
      const route = ownerEndpoints.getUidCookieEndpoint();
      const response = await fetch(route);
      if (!response.ok) {
        throw new Error("Error fetching images");
      }
      const data = await response.json();
      console.log("uid", data);
      setUid(data.uid);
    };
    getUid();
  }, []);
  return (
    <section className="flex items-center justify-center flex-col gap-7">
      <div className="flex items-center justify-center gap-10 sm:flex-row">
        <OptionButton
          key={1}
          onClick={() => handleOptionClick("UPLOAD_IMAGE")}
          title="Subir una imagen"
          className={`${
            selectedOption === "UPLOAD_IMAGE"
              ? "!bg-primary-15 !text-primary-25 border-primary-15"
              : ""
          } rounded-full size-28 bg-transparent border border-primary-25 text-primary-5 text-lg font-medium
     hover:bg-primary-25 hover:text-primary-10 hover:border-primary-15 transition-all duration-300 ease-out`}
        />
        <OptionButton
          key={2}
          onClick={() => handleOptionClick("EDIT_IMAGE")}
          title="Editar imagenes"
          className={`${
            selectedOption === "EDIT_IMAGE"
              ? "!bg-primary-15 !text-primary-25 border-primary-15"
              : ""
          } rounded-full size-28 bg-transparent border border-primary-25 text-primary-5 text-lg font-medium
     hover:bg-primary-25 hover:text-primary-10 hover:border-primary-15 transition-all duration-300 ease-out`}
        />
      </div>
      {selectedOption === "UPLOAD_IMAGE" && (
        <UploadCard fetchDataOf="PERSONAL" />
      )}
      {selectedOption === "EDIT_IMAGE" && (
        <EditImages fetchDataOf="PERSONAL" uid={uid} />
      )}
    </section>
  );
}
export default PersonalImages;
