import { Suspense } from "react";
import UserStats from "../component/user-stats";
import FetchRepos from "../fetch-repos";
/* eslint-disable @next/next/no-img-element */

export default function Home({
  params: { user },
}: {
  params: { user: string };
}) {
  return (
    <main className="w-full h-full flex flex-col items-center bg-gradient-to-b overflow-auto from-[#131313] to-black text-white">
      <Suspense fallback={<UserStats loading />}>
        <FetchRepos user={user} />
      </Suspense>
    </main>
  );
}
