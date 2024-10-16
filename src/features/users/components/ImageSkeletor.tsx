import { MdiImage } from "@/features/ui";

function ImageSkeletor() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[600px] p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
      <div className="flex items-center justify-center w-full h-48 bg-gray-200 rounded-lg flex-col">
        <MdiImage className="text-gray-400 w-12 h-12" />
        <p className="mt-4 text-gray-500">Sin imagen</p>
      </div>
    </div>
  );
}
export default ImageSkeletor;
