import { MdiImage } from "@/features/ui";

function ImageSkeletor() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[600px] p-4 bg-primary-25 border border-gray-300 rounded-lg shadow-lg">
      <div className="flex items-center justify-center w-full h-48 bg-primary-15 rounded-lg flex-col">
        <MdiImage className="text-primary-25 w-12 h-12" />
        <p className="mt-4 text-primary-25">Sin imagen</p>
      </div>
    </div>
  );
}
export default ImageSkeletor;
