"use client";
import { DEFAULT_COLOR } from "@/constants";
import { cn } from "@/utils/tailwind";
import { GithubData } from "@/utils/github";
import { motion } from "framer-motion";
import colors from "@/utils/colors.json";
import { LanguageName } from "@/utils/types";

type AnimatedBarProps = {
  username?: string;
  rank: number;
  loading?: boolean;
  language?: GithubData["pilledLanguages"][number];
};

export function AnimatedBar({
  language,
  username,
  rank,
  loading,
}: AnimatedBarProps) {
  const backgroundColor =
    (!loading &&
      language &&
      colors[language.name.toLocaleLowerCase() as LanguageName]?.color) ||
    DEFAULT_COLOR;
  return (
    <motion.a
      style={{
        backgroundColor,
      }}
      title={loading ? undefined : `${language?.name}`}
      className={cn(
        "transition duration-300 translate-y-4 hover:translate-y-0 pb-4 rounded-t-[3rem] h-full w-10 md:w-32 2xl:w-48 flex items-end justify-center",
        loading && "h-32 bg-gray-500 !animate-pulse",
      )}
      initial={{ height: "10%" }}
      animate={{
        height: `${loading ? 10 : language?.percentage || 0}%`,
        opacity: 1,
      }}
      href={
        username !== undefined && !loading && language
          ? `https://github.com/${username}?tab=repositories&q=&type=&language=${encodeURIComponent(language.name)}`
          : undefined
      }
      target="_blank"
    >
      {!loading && username && (
        <div className="text-center  text-black bg-white/70 rounded p-1 md:rounded-3xl md:p-5 text-lg md:text-4xl font-extrabold mb-2">
          #{rank}
        </div>
      )}
    </motion.a>
  );
}
