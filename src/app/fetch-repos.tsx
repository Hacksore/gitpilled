import { getUsersTopLanguages } from "@/utils/github";
import UserStats from "./component/user-stats";

export default async function FetchRepos({ user }: { user: string }) {
  const githubData = await getUsersTopLanguages(user);

  if (githubData === undefined) {
    return <UserStats user={user} githubData={undefined} />;
  }

  return <UserStats user={user} githubData={githubData} />;
}
