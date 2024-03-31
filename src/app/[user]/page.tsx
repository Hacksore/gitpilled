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
    <main className="w-full h-full flex flex-col items-center bg-gradient-to-b overflow-auto from-[#131313] to-black text-white">
      <Suspense fallback={<UserStats loading />}>
        <FetchRepos user={user} />
      </Suspense>
    </main>
  );
}
