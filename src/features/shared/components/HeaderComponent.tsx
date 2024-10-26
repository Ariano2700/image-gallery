import Image from "next/image";
import Link from "next/link";
import PersonalData from "./PersonalData";
import { members } from "../utils/OurNetworks";
import { rampart_one } from "@/fonts/fonts";
import ThemeToggleButton from "./ThemeToggleButton";
import LogOutButton from "@/features/ownerUsers/components/LogOutButton";

function HeaderComponent() {
  return (
    <header className="flex flex-col gap-4 md:flex-row items-center justify-between border-b border-primary-30 px-5 py-3 w-full shadow-md">
      <Link
        href="/"
        className="gap-2 items-center cursor-pointer flex justify-center px-3 hover:scale-105 transition-all duration-300"
      >
        <Image
          width={64}
          height={64}
          unoptimized
          src="/assets/mochisLogo.png"
          alt="Logo mochis wajaja"
        />
        <span
          className={`block text-primary-25 tracking-widest font-bold text-2xl ${rampart_one.className}`}
        >
          Mochis Gallery
        </span>
      </Link>
      <div className="flex flex-col-reverse gap-6 md:flex-row items-center justify-center h-full">
        <ThemeToggleButton />
        <div className="flex items-center justify-between md:justify-end px-4 md:pr-10 gap-8">
          {members.map((member, i) => (
            <PersonalData member={member} key={i} />
          ))}
        </div>
        <div className="">
          <LogOutButton />
        </div>
      </div>
    </header>
  );
}
export default HeaderComponent;
