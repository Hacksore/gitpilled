import { Suspense } from "react";
import UserStats from "../component/user-stats";
import FetchRepos from "../fetch-repos";

export default function Home({
  params: { user },
}: {
  params: { user: string };
}) {
  return (
    <Suspense fallback={<UserStats user={user} loading={true} />}>
      <FetchRepos user={user} />
    </Suspense>
  );
}
