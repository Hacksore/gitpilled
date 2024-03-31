import { unstable_cache } from "next/cache";
import { Octokit } from "octokit";

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

export async function nonCachedGetUsersTopLanguages(
  rawUser: string
): Promise<GithubData | undefined> {
  const queryUser = rawUser.toLowerCase();

  // TODO: we need a lot of tokens to cycle through
  try {
    const octokit = new Octokit({
      auth: process.env.GITHUB_PAT,
    });

    const userInfo = (await octokit.graphql.paginate(
      `query GetUsernameAndRepos($username: String!, $num: Int = 100, $cursor: String) {
        user(login: $username) {
          login,
          repositories(first: $num, after: $cursor, isFork: false) {
            nodes {
              name,
              languages(first: 100) {
                edges {
                  size,
                  node {
                    name
                  }
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }  
          }
        }
      }`,
      {
        username: queryUser,
      }
    )) as {
      user: {
        login: string;
        repositories: {
          nodes: {
            name: string;
            languages: {
              edges: {
                size: number;
                node: {
                  name: string;
                };
              }[];
            };
          }[];
        };
      };
    };

    const username = userInfo?.user?.login;

    const languagesMap = userInfo?.user?.repositories?.nodes
      ?.flatMap((r) => r.languages.edges)
      .reduce((acc, { node, size }) => {
        acc[node.name] = (acc[node.name] || 0) + size;
        return acc;
      }, {} as Record<string, number>);

    const repoLanguages = Object.entries(languagesMap)
      .map(([name, size]) => ({
        name,
        count: size,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const maxCount = repoLanguages[0]?.count || 0;
    const languagesWithPercentage = repoLanguages?.map((lang) => ({
      ...lang,
      percentage:
        maxCount !== 0
          ? 25 + Math.floor((lang.count / maxCount) * 100) * 0.75
          : 0,
    }));

    return {
      username,
      languages: languagesWithPercentage,
      maxCount,
    };
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

// use this when working on the nonCachedGetUsersTopLanguages function
// export const getUsersTopLanguages = nonCachedGetUsersTopLanguages;

export const getUsersTopLanguages = unstable_cache(
  (user: string) => nonCachedGetUsersTopLanguages(user),
  [`githubstats`]
);
