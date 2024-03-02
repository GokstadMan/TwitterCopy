"use client";

import { useSession,signIn,signOut } from "next-auth/react";

export default function Home() {

  const{ data: session } = useSession();
  if(session) {
    return(
      <div>
        <p>Name:{session.user?.name}</p>
        <img src={session.user?.image ?? ""} alt="githubpic" className="w-24"/>
        <button onClick={()=>signOut()}>Sign Out</button>
      </div>
    ) 
  }

    return (
      <div>
        <h1>You are not logged in!</h1><button onClick={()=>signIn("github")}>Sign in here</button>
      </div>
    );
}
