/* eslint-disable @next/next/no-img-element */
import { GitPilledLogo } from "@/components/logo";
import { AnimatedBar } from "./animatedbar";
import { GithubData } from "@/utils/github";
import { PilledLanguage } from "@/utils/pillgorithm";

const MOCK_NUMBERS = Array.from({ length: 5 }, (_, _i) => {
  const i = _i + 1;
  const mockData: PilledLanguage = {
    name: "Loading...",
    percentage: (i * i) / 25,
    realPercentage: 0,
    score: 0,
  };

  return mockData;
});

export default async function UserStats({
  githubData,
  loading,
  user,
}: {
  githubData?: GithubData;
  loading?: boolean;
  user: string;
}) {
  const shareData = new URLSearchParams();
  shareData.append(
    "url",
    `https://gitpilled.vercel.app/${githubData?.username || ""}`,
  );
  shareData.append(
    "text",
    `Checkout what ${githubData?.username || "everybody"} is pilled on 💊`,
  );

  return (
    <main className="w-screen h-screen bg-gradient-to-b from-[#131313] to-black text-white">
      <div
        className="h-full w-full overflow-y-hidden flex flex-col items-center overflow-auto  pt-12"
        style={{
          backgroundSize: "100px 100px",
          backgroundImage: `linear-gradient(to right, #ffffff08 1px, transparent 1px),
          linear-gradient(to bottom, #ffffff08 1px, transparent 1px)`,
        }}
      >
        <a href="/" className=" block mx-auto">
          <GitPilledLogo className="h-6 w-fit" />
        </a>
        {githubData !== undefined ? (
          <a target="_blank" href={`https://github.com/${githubData.username}`}>
            <img
              src={`https://github.com/${githubData.username}.png`}
              alt={`${githubData.username} avatar`}
              className="w-16 h-16 mt-10 overflow-hidden rounded-full mx-auto"
            />
          </a>
        ) : (
          <div className="w-16 h-16 mt-10 bg-neutral-600 overflow-hidden rounded-full mx-auto"></div>
        )}
        <h2 className="text-2xl md:text-3xl mt-4 text-center">
          {loading ? (
            "Loading..."
          ) : githubData === undefined ? (
            `User ${user} not found`
          ) : (
            <>
              This is what{" "}
              <span className="font-bold md:text-4xl">
                <a
                  target="_blank"
                  href={`https://github.com/${githubData.username}`}
                >
                  @{githubData.username}
                </a>
              </span>{" "}
              is pilled on
            </>
          )}
        </h2>
        <a
          className="bg-white group hover:scale-105 cursor-pointer transition duration-300 active:scale-95 rounded-full font-bold flex gap-2 items-center justify-center text-black w-64 text-2xl p-4 m-8"
          target="_blank"
          href={
            loading
              ? undefined
              : `https://twitter.com/intent/post?${shareData.toString()}`
          }
        >
          Share on{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            version="1.1"
            viewBox="0 0 300 300.251"
            className=" group-hover:rotate-[360deg] group-hover:scale-75 transition-transform duration-300"
          >
            <path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66" />
          </svg>
        </a>
        <div className="flex flex-grow w-fit pt-24 2xl:px-32 md:gap-8 2xl:gap-32 mx-auto">
          {(loading || githubData === undefined
            ? MOCK_NUMBERS
            : githubData.pilledLanguages
          ).map((lang, i) => {
            return (
              <div
                key={loading ? `loading-bar-${i}` : lang.name}
                className="h-full w-20 md:w-fit flex flex-col items-center justify-end md:gap-12"
              >
                <div className="text-center md:text-3xl font-extrabold">
                  {loading || githubData !== undefined ? lang.name : null}
                </div>
                <AnimatedBar
                  language={lang}
                  username={githubData?.username}
                  rank={i + 1}
                  loading={loading}
                />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
