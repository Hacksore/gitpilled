import { Suspense } from "react";
import UserStats from "../component/user-stats";
import FetchRepos from "../fetch-repos";

export default async function Home({
  params,
}: {
  params: Promise<{ user: string }>;
}) {
  const { user } = await params;

  return (
    <Suspense fallback={<UserStats user={user} loading={true} />}>
      <FetchRepos user={user} />
    </Suspense>
  );
}
