import { Suspense } from "react";
import UserStats from "../component/user-stats";
import FetchRepos from "../fetch-repos";
import { Metadata } from "next";

/* eslint-disable @next/next/no-img-element */
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://gitpilled.vercel.app"
  ),
};

export default function Home({
  params: { user },
}: {
  params: { user: string };
}) {
  return (
    <Suspense
      fallback={<UserStats user={user} loading={true} />}
    >
      <FetchRepos user={user} />
    </Suspense>
  );
}
