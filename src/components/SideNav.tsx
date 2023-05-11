import React from "react";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { IconsHoverEffect } from "./IconsHoverEffect";
import { VscAccount, VscHome, VscSignIn, VscSignOut } from "react-icons/vsc";

export const SideNav = () => {
  const session = useSession();
  const user = session?.data?.user;

  return (
    <nav className="item-start sticky top-0 px-2 py-4 ">
      <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
        <li>
          <Link href="/">
            <IconsHoverEffect>
              <span className="item-center flex gap-4">
                <VscHome className="h-8 w-8 md:hidden" />
                <span className="hidden text-lg md:inline">Home</span>
              </span>
            </IconsHoverEffect>
          </Link>
        </li>
        {user && (
          <li>
            <Link href={`/profiles/${user.id}`}>
              <IconsHoverEffect>
                <span className="item-center flex gap-4">
                  <VscAccount className="h-8 w-8 md:hidden" />
                  <span className="hidden text-lg md:inline">Profile</span>
                </span>
              </IconsHoverEffect>
            </Link>
          </li>
        )}
        {user ? (
          <li>
            <button onClick={() => void signOut()}>
              <IconsHoverEffect>
                <span className="item-center flex gap-4">
                  <VscSignOut className="h-8 w-8 md:hidden" />
                  <span className="hidden text-lg md:inline">Log Out</span>
                </span>
              </IconsHoverEffect>
            </button>
          </li>
        ) : (
          <li>
            <button onClick={() => void signIn()}>
              <IconsHoverEffect>
                <span className="item-center flex gap-4">
                  <VscSignIn className="h-8 w-8 md:hidden" />
                  <span className="hidden text-lg md:inline">Log In</span>
                </span>
              </IconsHoverEffect>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};
