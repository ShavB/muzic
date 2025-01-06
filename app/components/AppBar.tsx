"use client";

import React from "react";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function AppBar() {
  const session = useSession();
  console.log(session);
  return (
    <div>
      <div className="flex justify-between">
        <div className="m-2 p-2">MuZiC</div>
        <div>Logo</div>
        <div>
          {session.status === "authenticated" ? (
            <button
              className="m-2 p-2 border-2 rounded-lg hover:bg-red-600"
              onClick={() => signIn()}
            >
              Logout
            </button>
          ) : (
            <button
              className="m-2 p-2 border-2 rounded-lg hover:bg-green-600"
              onClick={() => signOut()}
            >
              Login
            </button>
          )}

          {/* {session.status === "authenticated" && (
            
          )}
          {session.status != "authenticated" && (
            
          )} */}
        </div>
      </div>
    </div>
  );
}
