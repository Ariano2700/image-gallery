import { RiLoader2Fill } from "../icons/remix-icon/RiLoader2Fill";

function FetchingLoader() {
  return (
    <p className="flex gap-2 justify-center items-center text-white">
      <span className="">
        <RiLoader2Fill className="animate-spin" />
      </span>
      Loading more...
    </p>
  );
}
export default FetchingLoader;
