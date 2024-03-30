import { Octokit } from "@octokit/rest";
import colors from "@/utils/colors.json";
import { useMemo } from "react";

type LanguageName = keyof typeof colors;
const DEFAULT_COLOR = "#444444";

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
    .filter((repo) => repo.language)
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
    {}
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

  return (
    <main className="w-full h-full flex flex-col bg-gradient-to-b overflow-auto from-[#131313] to-black text-white">
      <h2 className="text-3xl mt-16 text-center">
        <span className="font-bold text-4xl">@{user}</span> is pilled on
      </h2>
      <div className="flex flex-grow pt-24 px-32 gap-24 w-fit mx-auto">
        {languagesWithPercentage.map((lang) => (
          <div
            key={lang.name}
            className="h-full flex flex-col items-center justify-end gap-12"
          >
            <div className="text-center text-3xl font-extrabold">
              {lang.name}
            </div>
            <div
              className="rounded-t-3xl h-full w-12 md:w-48"
              style={{
                backgroundColor:
                  colors[lang.name.toLocaleLowerCase() as LanguageName].color ||
                  DEFAULT_COLOR,
                height: `${lang.percentage}%`,
              }}
            ></div>
          </div>
        ))}
      </div>
    </main>
  );
}
