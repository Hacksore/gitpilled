import { getUsersTopLanguages } from "@/utils/github";
import UserStats from "./component/user-stats";

export default async function FetchRepos({ user }: { user: string }) {
  const languages = await getUsersTopLanguages(user);

  return (
    <main className="w-full h-full flex flex-col items-center bg-gradient-to-b overflow-auto from-[#131313] to-black text-white">
      <UserStats user={user} languages={languages} />
    </main>
  );
}
