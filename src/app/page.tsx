"use client";

import { useState } from "react";
import { redirect } from "next/navigation";

const redirectToUserProfile = (username: string) => {
  return redirect("/" + username);
};

export default function Home() {
  const [user, setUser] = useState < string > ("");
  return (
    <main className="flex flex-col min-h-screen text-white bg-black p-24">
      <h1>gitpilled</h1>
      Search for a user to see their top languages
      <br />
      <form action={() => redirectToUserProfile(user)}>
        <input
          name="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          data-disable-1password="true"
          className="bg-black"
          placeholder="Enter a github username"
          type="text"
        />
      </form>
    </main>
  );
}
