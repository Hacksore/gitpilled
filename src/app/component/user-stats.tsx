import { DEFAULT_COLOR } from "@/constants";
import colors from "@/utils/colors.json";
import { LanguageName } from "@/utils/types";
import { AnimatedBar } from "./animatedbar";
import { notFound } from "next/navigation";

type GitHubUserInfo = {
  username: string;
  languages: { name: string; count: number; percentage: number }[];
  maxCount: number;
};

export default async function UserStats({
  user,
  languages,
}: {
  user?: string;
  languages?: { name: string; count: number }[];
}) {
  let userInfo: GitHubUserInfo | undefined = undefined;

  if (languages !== undefined) {
    const maxCount = languages[0]?.count || 0;
    const languagesWithPercentage = languages?.map((lang) => ({
      ...lang,
      percentage:
        maxCount !== 0
          ? 25 + Math.floor((lang.count / maxCount) * 100) * 0.75
          : 0,
    }));

    userInfo = {
      username: user as string,
      languages: languagesWithPercentage,
      maxCount,
    };
  }

  const shareData = new URLSearchParams();
  shareData.append("url", `https://gitpilled.vercel.app/${user}`);
  shareData.append("text", `Checkout what ${user} is pilled on 💊`);

  return (
    <main className="w-screen h-screen bg-gradient-to-b from-[#131313] to-black text-white">
      <div
        className="h-full w-full overflow-y-hidden flex flex-col items-center overflow-auto"
        style={{
          backgroundSize: "100px 100px",
          backgroundImage: `linear-gradient(to right, #ffffff08 1px, transparent 1px),
          linear-gradient(to bottom, #ffffff08 1px, transparent 1px)`,
        }}
      >
        {userInfo !== undefined ? (
          <img
            src={`https://github.com/${userInfo.username}.png`}
            alt={`${userInfo.username} avatar`}
            className="w-16 h-16 mt-10 overflow-hidden rounded-full mx-auto"
          />
        ) : (
          <div className="w-16 h-16 mt-10 bg-neutral-600 overflow-hidden rounded-full mx-auto"></div>
        )}

        <h2 className="text-2xl md:text-3xl mt-4 text-center">
          {userInfo !== undefined ? (
            <>
              <span className="font-bold md:text-4xl">
                @{userInfo.username}
              </span>
              is pilled on
            </>
          ) : (
            "Loading..."
          )}
        </h2>
        <a
          className="bg-white hover:scale-105 transition duration-300 active:scale-95 rounded-full font-bold flex gap-2 items-center justify-center text-black w-64 text-2xl p-4 m-8"
          target="_blank"
          href={
            userInfo === undefined
              ? `https://twitter.com/intent/post?${shareData.toString()}`
              : undefined
          }
        >
          Share on{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            version="1.1"
            viewBox="0 0 300 300.251"
          >
            <path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66" />
          </svg>
        </a>
        <div className="flex flex-grow w-fit pt-24 2xl:px-32 md:gap-8 2xl:gap-32 mx-auto">
          {userInfo !== undefined &&
            userInfo?.languages.map((lang, i) => {
              const backgroundColor =
                colors[lang.name.toLocaleLowerCase() as LanguageName].color ||
                DEFAULT_COLOR;
              return (
                <div
                  key={lang.name}
                  className="h-full w-20 md:w-fit flex flex-col items-center justify-end md:gap-12"
                >
                  <div className="text-center md:text-3xl font-extrabold">
                    {lang.name}
                  </div>
                  <AnimatedBar
                    backgroundColor={backgroundColor}
                    percentage={lang.percentage}
                    languageName={lang.name}
                    username={user as string}
                    rank={i + 1}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </main>
  );
}
