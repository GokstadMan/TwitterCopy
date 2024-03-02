"use client";

import { useSession,signIn,signOut } from "next-auth/react";

export default function Home() {

  const{ data: session } = useSession();
  if(session) {
    return(
      <div>
        <p>
          Name:{session.user?.name}
        </p>
        <img src={session.user?.image ?? ""} alt="githubpic" className="w-24"/>
        <button onClick={()=>signOut()}>
          Sign Out
        </button>
      </div>
    ) 
  }

    return (
      <div className="flex justify-center mt-20">
        <div className="flex flex-col text-center gap-4">
            <div className="flex justify-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/1245px-Logo_of_Twitter.svg.png" className="w-12" alt="twitter-logo" />
            </div>
            <h1 className="text-2xl font-semibold">Happening now</h1>
            <h2 className="text-xl">Join today</h2>
            <button className="text-white bg-[#60a5fa] rounded-xl p-2" onClick={()=>signIn("github")}>Sign in with GitHub</button>
            <p className="text-sm">Do not have a GitHub account yet? Sign up <a href="https://github.com" target="_blank" className="underline">here</a> </p>
        </div>
      </div>
    );
}
