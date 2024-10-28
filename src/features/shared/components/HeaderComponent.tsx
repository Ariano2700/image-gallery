import Link from "next/link";
import PersonalData from "./PersonalData";
import { members } from "../utils/OurNetworks";
import { rampart_one } from "@/fonts/fonts";
import ThemeToggleButton from "./ThemeToggleButton";
import LogOutButton from "@/features/ownerUsers/components/LogOutButton";
import NavButton from "./NavButton";
import Navbar from "@/features/users/components/Navbar";

function HeaderComponent() {
  return (
    <>
      <header className="flex sm:flex-col gap-4 md:flex-row items-center justify-between border-b border-primary-30 px-5 py-3 w-full shadow-md">
        <Link
          href="/"
          className="gap-2 items-center cursor-pointer flex justify-center px-3 hover:scale-105 transition-all duration-300"
        >
          <img
            className="size-12 sm:size-16"
            src="/assets/mochisLogo.png"
            alt="Logo mochis wajaja"
          />
          <span
            className={`block text-primary-25 tracking-widest font-bold text-xl sm:text-2xl ${rampart_one.className}`}
          >
            Mochis Gallery
          </span>
        </Link>
        <div className="hidden sm:flex flex-col-reverse gap-6 md:flex-row items-center justify-center h-full">
          <ThemeToggleButton />
          <div className="flex items-center justify-between md:justify-end gap-8">
            {members.map((member, i) => (
              <PersonalData member={member} key={i} />
            ))}
          </div>
          <div>
            <LogOutButton />
          </div>
        </div>
        <NavButton />
      </header>
      <Navbar />
    </>
  );
}
export default HeaderComponent;
