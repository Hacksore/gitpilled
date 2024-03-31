import { Octokit } from "@octokit/rest";

export async function getUsersTopLanguages(username: string) {
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
