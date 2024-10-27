"use client";
import { OcticonThreeBars16 } from "@/features/ui";
import { motion } from "framer-motion";
import { useState } from "react";
import { members } from "../utils/OurNetworks";
import PersonalData from "./PersonalData";
import ThemeToggleButton from "./ThemeToggleButton";
import LogOutButton from "@/features/ownerUsers/components/LogOutButton";
import { useAuthContext } from "@/providers/firebaseProvider/ProviderFirebase";

function NavButton() {
  const [open, setOpen] = useState(false);
  const { user } = useAuthContext();

  return (
    <div
      onClick={() => setOpen(!open)}
      className="relative cursor-pointer sm:hidden p-3 rounded-full dark:bg-primary-15 border dark:border-primary-25 dark:text-primary-25 bg-primary-30 border-primary-20 text-primary-5"
    >
      <OcticonThreeBars16 className="size-5 font-bold" />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.2, delay: 0.1, ease: "backInOut" }}
        className={`z-10 dark:bg-primary-15 bg-primary-20 rounded-lg shadow-xl ${user !== null ? "-bottom-[385px]" : "-bottom-[335px]"} -left-[130px] 
                ${open ? "absolute" : "hidden"}`}
      >
        <div className="absolute right-2 -top-2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-primary-20 dark:border-b-primary-15"></div>
        <ul className="px-4 py-4 flex flex-col items-center gap-4">
          {members.map((member, i) => (
            <PersonalData member={member} key={i} />
          ))}
          <ThemeToggleButton />
          <div>
            <LogOutButton />
          </div>
        </ul>
      </motion.div>
    </div>
  );
}
export default NavButton;
