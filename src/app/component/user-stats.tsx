import { DEFAULT_COLOR } from "@/constants";
import colors from "@/utils/colors.json";
import { LanguageName } from "@/utils/types";

export default async function UserStats({
  loading = false,
  user,
  languages = [
    { name: "JavaScript", count: 100 },
    { name: "TypeScript", count: 50 },
    { name: "Python", count: 25 },
    { name: "Java", count: 10 },
    { name: "C++", count: 5 },
  ],
}: {
  user?: string;
  languages?: { name: string; count: number }[];
  loading?: boolean;
}) {
  const maxCount = languages[0].count;
  const languagesWithPercentage = languages.map((lang) => ({
    ...lang,
    percentage: 25 + Math.floor((lang.count / maxCount) * 100) * 0.75,
  }));

  const shareData = new URLSearchParams();
  shareData.append("url", `https://gitpilled.vercel.app/${user}`);
  shareData.append("text", `Checkout what ${user} is pilled on 💊`);

  return (
    <main className="w-full h-full flex flex-col items-center bg-gradient-to-b overflow-auto from-[#131313] to-black text-white">
      {!loading ? (
        <img
          src={`https://github.com/${user}.png`}
          alt={`${user} avatar`}
          className="w-16 h-16 mt-10 overflow-hidden rounded-full mx-auto"
        />
      ) : (
        <div className="w-16 h-16 mt-10 bg-neutral-600 overflow-hidden rounded-full mx-auto"></div>
      )}

      <h2 className="text-2xl md:text-3xl mt-4 text-center">
        {!loading ? (
          <>
            <span className="font-bold md:text-4xl">@{user}</span> is pilled on
          </>
        ) : (
          "Loading..."
        )}
      </h2>
      <a
        className="bg-white rounded-full font-bold flex items-center justify-center text-black w-64 text-2xl p-4 m-8"
        target="_blank"
        href={
          !loading
            ? `https://twitter.com/intent/post?${shareData.toString()}`
            : undefined
        }
      >
        Share on twitter
      </a>
      <div className="flex flex-grow w-fit pt-24 2xl:px-32 md:gap-8 2xl:gap-32 mx-auto">
        {languagesWithPercentage.map((lang, i) => {
          let barStyles = {};

          if (!loading) {
            barStyles = {
              backgroundColor:
                colors[lang.name.toLocaleLowerCase() as LanguageName].color ||
                DEFAULT_COLOR,
            };
          } else {
            barStyles = {
              opacity: 0.2,
              backgroundColor: "gray",
            };
          }

          return (
            <a
              key={lang.name}
              className="h-full w-20 md:w-fit flex flex-col items-center justify-end md:gap-12"
              href={
                !loading
                  ? `https://github.com/${user}?tab=repositories&q=&type=&language=${lang.name}`
                  : undefined
              }
              target="_blank"
            >
              {!loading && (
                <>
                  <div className="text-center md:text-2xl font-extrabold">
                    #{i + 1}
                  </div>
                  <div className="text-center md:text-3xl font-extrabold">
                    {lang.name}
                  </div>
                </>
              )}
              <div
                className="rounded-t-3xl h-full w-10 md:w-32 2xl:w-48"
                style={{
                  ...barStyles,
                  height: `${lang.percentage}%`,
                }}
              ></div>
            </a>
          );
        })}
      </div>
    </main>
  );
}
