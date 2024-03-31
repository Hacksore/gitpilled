"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GitPilledLogo } from "@/components/logo";
import GitHubButton from "react-github-btn";

const redirectToUserProfile = (username: string) => {
  return redirect("/" + username);
};

export default function Home() {
  const [user, setUser] = useState<string>("");
  return (
    <main className="w-screen h-screen bg-gradient-to-b from-[#131313] to-black text-white dark">
      <div
        className="h-full w-full overflow-y-hidden flex flex-col items-center justify-center gap-12 overflow-auto animated-grid"
        style={{
          backgroundSize: "100px 100px",
          backgroundImage: `linear-gradient(to right, #ffffff08 1px, transparent 1px),
        linear-gradient(to bottom, #ffffff08 1px, transparent 1px)`,
        }}
      >
        <div className="relative flex flex-col items-center bg-background p-8 mx-2 md:p-12 gap-2 rounded-xl border border-primary/10">
          <div className="absolute top-4 right-4">
            <GitHubButton
              href="https://github.com/Hacksore/gitpilled"
              data-color-scheme="no-preference: dark; light: dark; dark: dark;"
              data-icon="octicon-star"
              data-size="large"
              data-show-count="true"
              aria-label="Star Hacksore/gitpilled on GitHub"
            >
              Star
            </GitHubButton>
          </div>
          <img src="/pill.png" alt="pill" className="w-24 h-24" />
          <GitPilledLogo className="h-8 w-fit mt-2 " />
          <h2 className="text-xl font-bold">
            What language are you pilled in?
          </h2>
          <form
            action={() => redirectToUserProfile(user)}
            className="flex mt-8"
          >
            <Input
              name="user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              data-disable-1password="true"
              placeholder="Github username"
              type="text"
            />
            <Button variant={"default"}>Search</Button>
          </form>
        </div>
      </div>
    </main>
  );
}
