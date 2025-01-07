"use client";

import React from "react";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function AppBar() {
  const session = useSession();
  return (
    <div>
      <div className="flex justify-between">
        <div className="m-2 p-2">MuZiC</div>
        <div>Logo</div>
        <div>
          {session.data?.user && (
            <button
              className="m-2 p-2 border-2 rounded-lg hover:bg-red-600"
              onClick={() => signOut()}
            >
              Logout
            </button>
          )}
          {!session.data?.user && (
            <button
              className="m-2 p-2 border-2 rounded-lg hover:bg-green-600"
              onClick={() => signIn()}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
