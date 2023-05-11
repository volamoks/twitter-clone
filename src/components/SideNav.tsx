import React from "react";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export const SideNav = () => {
  const session = useSession();
  const user = session?.data?.user;

  return (
    <nav className="item-start sticky top-0 px-2 py-4 ">
      <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
        <li>
          <Link href="/">Home</Link>
        </li>
        {user && (
          <li>
            <Link href={`/profiles/${user.id}`}>Profile</Link>
          </li>
        )}
        {user ? (
          <li>
            <button onClick={() => void signOut()}>Sing Out</button>
          </li>
        ) : (
          <li>
            <button onClick={()=>void signIn()}>Sign In</button>
          </li>
        )}
      </ul>
    </nav>
  );
};
