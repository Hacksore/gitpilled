import { Octokit } from "octokit";
import { PilledLanguage, pillgorithm } from "./pillgorithm";
import { unstable_cache } from "next/cache";

export type GithubData = {
  username: string;
  pilledLanguages: PilledLanguage[];
};
export async function nonCachedGetUsersTopLanguages(
  rawUser: string,
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
              url,
              updatedAt,
              createdAt,
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
      },
    )) as {
      user: {
        login: string;
        repositories: {
          nodes: {
            name: string;
            url: string;
            createdAt: string;
            updatedAt: string;
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

    userInfo.user.repositories.nodes = userInfo.user.repositories.nodes.filter(
      (r) =>
        r.url
          ?.toLocaleLowerCase()
          .startsWith(`https://github.com/${username}`.toLocaleLowerCase()),
    );

    const { pilledLanguages } = pillgorithm(
      userInfo.user.repositories.nodes.map((repo) => ({
        ...repo,
        languages: repo.languages.edges.map((lang) => ({
          name: lang.node.name,
          size: lang.size,
        })),
      })),
    );

    return {
      username,
      pilledLanguages,
    };
  } catch (error: any) {
    console.error(error.message);
    return undefined;
  }
}

const getUsersTopLanguagesCached = unstable_cache(
  (user: string) => nonCachedGetUsersTopLanguages(user),
  ["githubstats"],
  {
    revalidate: 3600,
  },
);

let getUsersTopLanguages: typeof nonCachedGetUsersTopLanguages;
if (process.env.NODE_ENV !== "production") {
  getUsersTopLanguages = nonCachedGetUsersTopLanguages;
} else {
  getUsersTopLanguages = getUsersTopLanguagesCached;
}

export { getUsersTopLanguages };
