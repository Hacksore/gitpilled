"use client";
import { motion } from "framer-motion";

type AnimatedBarProps = {
  backgroundColor: string;
  percentage: number;
  languageName: string;
  loading: boolean;
  username: string;
  rank: number;
};

export function AnimatedBar({
  backgroundColor,
  percentage,
  languageName,
  loading,
  username,
  rank,
}: AnimatedBarProps) {
  return (
    <motion.a
      className="rounded-t-[3rem] h-full w-10 md:w-32 2xl:w-48 flex items-end justify-center"
      style={{
        backgroundColor,
      }}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: `${percentage}%`, opacity: 1 }}
      transition={{
        type: "spring",
        damping: 10,
        stiffness: 100,
      }}
      href={
        !loading
          ? `https://github.com/${username}?tab=repositories&q=&type=&language=${languageName}`
          : undefined
      }
      target="_blank"
    >
      <div className="text-center  text-black bg-white/70 rounded p-1 md:rounded-3xl md:p-5 text-lg md:text-4xl font-extrabold mb-2">
        #{rank}
      </div>
    </motion.a>
  );
}
