"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

interface RoutesI {
  path: string;
  name: string;
}
function Navbar() {
  const pathRoute = usePathname();
  const routes: RoutesI[] = [
    {
      path: "/",
      name: "Nosotros",
    },
    {
      path: "/fatima",
      name: "Fatima",
    },
    {
      path: "/ariano",
      name: "Ariano",
    },
  ];
  return (
    <nav className="bg-transparent w-full overflow-x-auto p-4 flex items-center sm:justify-start justify-center">
      <ul className="flex gap-7">
        {routes.map((route, i) => (
          <Link
            key={i}
            href={route.path}
            className={`px-3 py-1 rounded-xl transition-all ease-linear hover:bg-primary-10 hover:text-primary-30 duration-300 ${
              pathRoute === route.path
                ? "bg-primary-10 text-primary-30"
                : "bg-primary-25 text-primary-5"
            }`}
          >
            {route.name}
          </Link>
        ))}
      </ul>
    </nav>
  );
}
export default Navbar;
