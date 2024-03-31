"use client";

import UserStats from "../component/user-stats";

export default function Error() {
  return (
    <div>
      <UserStats user="wumpus" githubData={undefined}  />
    </div>
  );
}
