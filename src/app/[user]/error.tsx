"use client"; // Error components must be Client Components

import { useEffect } from "react";
import UserStats from "../component/user-stats";
import { useParams } from "next/navigation";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const params = useParams<{ user: string  }>();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return <UserStats user={params.user} githubData={undefined} />;
}
