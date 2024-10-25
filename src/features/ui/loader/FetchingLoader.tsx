import RiLoader2Fill from "../icons/remix-icon/RiLoader2Fill";

function FetchingLoader() {
  return (
    <p className="flex gap-2 justify-center items-center text-primary-30">
      <span className="">
        <RiLoader2Fill className="animate-spin " />
      </span>
      Cargando más fotos...
    </p>
  );
}
export default FetchingLoader;
