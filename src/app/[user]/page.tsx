import { Octokit } from "@octokit/rest";
import colors from "@/utils/colors.json";

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
      <img
        src="https://github.com/hacksore.png"
        alt={`${user} avatar`}
        className="w-18 h-16 mt-10 overflow-hidden rounded-full mx-auto"
      />
      <h2 className="text-2xl md:text-3xl mt-4 text-center">
        <span className="font-bold md:text-4xl">@{user}</span> is pilled on
      </h2>
      <div className="flex flex-grow w-fit pt-24 xl:px-32 md:gap-8 xl:gap-32 mx-auto">
        {languagesWithPercentage.map((lang, i) => (
          <a
            key={lang.name}
            className="h-full w-20 md:w-fit flex flex-col items-center justify-end md:gap-12"
            href={`https://github.com/${user}?tab=repositories&q=&type=&language=${lang.name}`}
          >
            <div className="text-center md:text-2xl font-extrabold">
              #{i + 1}
            </div>
            <div className="text-center md:text-3xl font-extrabold">
              {lang.name}
            </div>
            <div
              className="rounded-t-3xl h-full w-10 md:w-32 xl:w-48"
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
