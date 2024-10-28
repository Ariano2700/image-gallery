"use client";
import { dancing_script, indie_flower } from "@/fonts/fonts";
import useImageStore from "@/store/imageStore/imageData.store";
import DownloadImage from "./DownloadImage";
import ShareImage from "./ShareImage";

function UsersImageOptions() {
  const selectedImage = useImageStore((state) => state.selectedImage);
  return (
    <>
      {selectedImage && (
        <>
          <div
            className={`mb-5 flex items-center ${
              selectedImage.title && selectedImage.date
                ? "justify-between"
                : selectedImage.title
                ? "justify-start"
                : selectedImage.date
                ? "justify-end"
                : "hidden"
            }`}
          >
            {selectedImage.title && (
              <p
                className={`font-semibold ${dancing_script.className} text-2xl md:text-4xl`}
              >
                {selectedImage.title}
              </p>
            )}
            {selectedImage.date && (
              <p className="italic font-semibold text-lg md:text-xl text-nowrap">
                {selectedImage.date}
              </p>
            )}
          </div>
          <div
            className={`flex ${
              selectedImage.description ? "items-center" : "hidden"
            }`}
          >
            {selectedImage.description && (
              <p className={`${indie_flower.className} text-wrap text-xl md:text-2xl`}>
                {selectedImage.description}
              </p>
            )}
          </div>
          <div className="flex justify-between mt-3">
            <DownloadImage selectedImage={selectedImage} />
            <ShareImage selectedImage={selectedImage} />
          </div>
        </>
      )}
    </>
  );
}
export default UsersImageOptions;
