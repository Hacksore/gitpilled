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
    <main className="w-screen h-screen bg-gradient-to-b from-[#131313] to-black text-white">
      <div
        className="h-full w-full overflow-y-hidden flex flex-col items-center justify-center gap-12 overflow-auto animated-grid"
        style={{
          backgroundSize: "100px 100px",
          backgroundImage: `linear-gradient(to right, #ffffff08 1px, transparent 1px),
        linear-gradient(to bottom, #ffffff08 1px, transparent 1px)`,
        }}
      >
        <div className="flex flex-col items-center">
        <img src="/pill.png" alt="pill" className="w-24 h-24" />
        <h2 className="text-3xl md:text-5xl mt-4">
          What language are you pilled in?
        </h2>
        </div>
        <form action={() => redirectToUserProfile(user)} className="flex">
          <div className="bg-primary flex p-6 gap-2 rounded-xl border-foreground/10">
            <Input
              name="user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              data-disable-1password="true"
              placeholder="Github username"
              type="text"
            />
            <Button>Search</Button>
          </div>
        </form>
      </div>
    </main>
  );
}
