"use client";

import { useState } from "react";
import { redirect } from "next/navigation";

const redirectToUserProfile = (username: string) => {
  return redirect("/" + username);
};

export default function Home() {
  const [user, setUser] = useState<string>("");
  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-8 text-white bg-black p-24">
      <h2 className="text-4xl">What language are you pilled in?</h2>
      <form action={() => redirectToUserProfile(user)}>
        <input
          name="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          data-disable-1password="true"
          className="border border-neutral-600 bg-black p-2 rounded-l-lg text-4xl"
          placeholder="Github username"
          type="text"
        />
        <button className="bg-blue-700 rounded-r-xl p-2 text-4xl">Search</button>
      </form>
      
    </main>
  );
}
