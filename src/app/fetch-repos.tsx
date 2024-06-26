import { getUsersTopLanguages } from "@/utils/github";
import UserStats from "./component/user-stats";

export default async function FetchRepos({ user }: { user: string }) {
  const githubData = await getUsersTopLanguages(user);

  return <UserStats user={user} githubData={githubData} />;
}
