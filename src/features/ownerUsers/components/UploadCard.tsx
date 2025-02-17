"use client";
import { useState } from "react";
import uploadCardStyle from "../css/uploadCardStyle.module.css";
import { CldUploadWidget } from "next-cloudinary";
import { ExtendedCloudinaryUploadWidgetResults } from "@/business/ownerUser/interfaces/cldUploadResults";
import SubmitImageData from "./SubmitImageData";
import { fetchDataOfI } from "@/features/shared/hooks/useInfiniteScrollObserver";

function UploadCard({ fetchDataOf }: fetchDataOfI) {
  const [resultData, setResultData] =
    useState<ExtendedCloudinaryUploadWidgetResults | null>(null);

  return (
    <section className="flex flex-col gap-10 items-center justify-center">
      <SubmitImageData
        fetchDataOf={{ fetchDataOf }}
        resultData={resultData}
        resetResultData={() => setResultData(null)}
      />
      {!resultData && (
        <CldUploadWidget
          options={{
            sources: ["local", "camera", "google_drive"],
            multiple: false,
            maxFiles: 1,
          }}
          uploadPreset="unsigned_img_page"
          onClose={() => {
            document.body.style.overflow = "auto"; // Deshabilitar overflow hidden
          }}
          onSuccess={(result) => {
            document.body.style.overflow = "auto"; // Deshabilitar overflow hidden
            const parsedResult =
              result as unknown as ExtendedCloudinaryUploadWidgetResults;
            // Verifica que las propiedades clave existan antes de establecer el estado
            if (parsedResult && parsedResult.info && parsedResult.info.url) {
              setResultData(parsedResult);
            } else {
              console.error(
                "El resultado no tiene la estructura esperada",
                result
              );
            }
          }}
        >
          {({ open }) => {
            return (
              <button
                onClick={() => open()}
                className={`${uploadCardStyle.file_upload_form}`}
              >
                <label
                  htmlFor="file"
                  className={`${uploadCardStyle.file_upload_label}`}
                >
                  <div className={`${uploadCardStyle.file_upload_design}`}>
                    <svg viewBox="0 0 640 512" height="1em">
                      <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                    </svg>
                    <p>Click to start</p>
                    <p>uploading images</p>
                    <span className={`${uploadCardStyle.browse_button} mt-3`}>
                      Browse
                    </span>
                  </div>
                </label>
              </button>
            );
          }}
        </CldUploadWidget>
      )}
    </section>
  );
}
export default UploadCard;
