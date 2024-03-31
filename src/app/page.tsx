"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const redirectToUserProfile = (username: string) => {
  return redirect("/" + username);
};

export default function Home() {
  const [user, setUser] = useState<string>("");
  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-8 text-white bg-black p-24">
      <img src="/pill.png" alt="pill" className="w-20 h-20" />
      <h2 className="text-4xl">What language are you pilled in?</h2>
      <form action={() => redirectToUserProfile(user)} className="flex">
        <Input
          name="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          data-disable-1password="true"
          placeholder="Github username"
          type="text"
        />
        <Button>Search</Button>
      </form>
    </main>
  );
}
