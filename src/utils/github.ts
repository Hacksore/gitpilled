import { Octokit } from "@octokit/rest";

interface UserRepos {
  name: string;
  count: number;
  percentage: number;
}

export type GithubData = {
  username: string;
  languages: UserRepos[];
  maxCount?: number;
};

export async function getUsersTopLanguages(
  rawUser: string
): Promise<GithubData | undefined> {
  const username = rawUser.toLowerCase();

  // TODO: we need a lot of tokens to cycle through
  const octokit = new Octokit({
    auth: process.env.GITHUB_PAT,
  });

  try {
    const userInfo = await octokit.request("GET /users/{username}", {
      username,
    });

    console.log("userinfo", {
      rateLimit: userInfo.headers["x-ratelimit-limit"]
    });

    const listOfRepos = await octokit.paginate("GET /users/{username}/repos", {
      username: username,
    });

    console.log("listRepos", {
      rateLimit: userInfo.headers["x-ratelimit-limit"]
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

    const languages = sortedLanguages.slice(0, 5);

    const maxCount = languages[0]?.count || 0;
    const languagesWithPercentage = languages?.map((lang) => ({
      ...lang,
      percentage:
        maxCount !== 0
          ? 25 + Math.floor((lang.count / maxCount) * 100) * 0.75
          : 0,
    }));
    return {
      username: userInfo.data.login,
      languages: languagesWithPercentage,
      maxCount,
    };
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
