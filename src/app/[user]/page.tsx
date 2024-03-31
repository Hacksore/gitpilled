/* eslint-disable @next/next/no-img-element */
import { Octokit } from "@octokit/rest";
import colors from "@/utils/colors.json";
import { DEFAULT_COLOR, LanguageName } from "@/utils";

async function getUsersTopLanguages(username: string) {
  const octokit = new Octokit({
    // TODO: add the way to round robin the tokens here
    auth: process.env.GITHUB_AUTH_TOKEN,
  });

  const listOfRepos = await octokit.paginate("GET /users/{username}/repos", {
    username: username,
  });

  // create a list of all the langauge data
  const filteredRepos = listOfRepos
    .filter((repo) => repo.language && !repo.fork)
    .map((repo) => repo.language);

  // get the count of each language in the list
  const languageCount = filteredRepos.reduce(
    (acc: Record<string, number>, lang) => {
      if (!lang) return acc;

      if (acc[lang]) {
        acc[lang] += 1;
      } else {
        acc[lang] = 1;
      }
      return acc;
    },
    {},
  );

  // sort the languages by count and have name and count as a property
  const sortedLanguages = Object.entries(languageCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return sortedLanguages.splice(0, 5);
}

export default async function Home({
  params: { user },
}: {
  params: { user: string };
}) {
  const languages = await getUsersTopLanguages(user);

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
      <img
        src={`https://github.com/${user}.png`}
        alt={`${user} avatar`}
        className="w-18 h-16 mt-10 overflow-hidden rounded-full mx-auto"
      />
      <h2 className="text-2xl md:text-3xl mt-4 text-center">
        <span className="font-bold md:text-4xl">@{user}</span> is pilled on
      </h2>
      <a
        className="bg-white rounded-full font-bold flex items-center justify-center text-black w-64 text-2xl p-4 m-8"
        target="_blank"
        href={`https://twitter.com/intent/post?${shareData.toString()}`}
      >
        Share on twitter
      </a>
      <div className="flex flex-grow w-fit pt-24 2xl:px-32 md:gap-8 2xl:gap-32 mx-auto">
        {languagesWithPercentage.map((lang, i) => (
          <a
            key={lang.name}
            className="h-full w-20 md:w-fit flex flex-col items-center justify-end md:gap-12"
            href={`https://github.com/${user}?tab=repositories&q=&type=&language=${lang.name}`}
            target="_blank"
          >
            <div className="text-center md:text-2xl font-extrabold">
              #{i + 1}
            </div>
            <div className="text-center md:text-3xl font-extrabold">
              {lang.name}
            </div>
            <div
              className="rounded-t-3xl h-full w-10 md:w-32 2xl:w-48"
              style={{
                backgroundColor:
                  colors[lang.name.toLocaleLowerCase() as LanguageName].color ||
                  DEFAULT_COLOR,
                height: `${lang.percentage}%`,
              }}
            ></div>
          </a>
        ))}
      </div>
    </main>
  );
}
