import { ImagesI } from "@/business/users/interfaces/linkImagesInterface";
import { create } from "zustand";

interface ImageStore {
  selectedImage: ImagesI | null;
  setSelectedImage: (selectedImage: ImagesI | null) => void;
}
const useImageStore = create<ImageStore>((set) => ({
  selectedImage: null,
  setSelectedImage: (Image) => set({ selectedImage: Image }),
}));
export default useImageStore;
