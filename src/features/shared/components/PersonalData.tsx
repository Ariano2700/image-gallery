"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { MageX, MdiFacebook, MdiInstagram } from "@/features/ui";
import { OurDataI } from "@/interfaces/NetworksI";

function PersonalData({ member }: { member: OurDataI }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
      className="flex items-center justify-center flex-col bg-primary-30 p-2 text-primary-5 rounded-md dark:bg-primary-25 dark:text-primary-10"
    >
      <h3 className="font-medium text-center text-lg text-nowrap">{member.name}</h3>
      <nav className="flex gap-5 text-2xl">
        {member.networks.instagram && (
          <Link
            className="hover:text-primary-30 transition-all ease-linear hover:bg-primary-10 duration-300 border border-primary-10 hover:border-primary-25 p-2 rounded-full bg-transparent"
            target="_blank"
            href={member.networks.instagram}
          >
            <MdiInstagram className="" />
          </Link>
        )}
        {member.networks.facebook && (
          <Link
            className="hover:text-primary-30 transition-all ease-linear hover:bg-primary-10 duration-300 border border-primary-10 hover:border-primary-25 p-2 rounded-full bg-transparent"
            target="_blank"
            href={member.networks.facebook}
          >
            <MdiFacebook className="" />
          </Link>
        )}
        {member.networks.twitter && (
          <Link
            className="hover:text-primary-30 transition-all ease-linear hover:bg-primary-10 duration-300 border border-primary-10 hover:border-primary-25 p-2 rounded-full bg-transparent"
            target="_blank"
            href={member.networks.twitter}
          >
            <MageX className="" />
          </Link>
        )}
      </nav>
    </motion.div>
  );
}

export default PersonalData;
