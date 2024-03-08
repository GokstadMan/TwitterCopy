"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import api from "@/app/lib/axios";
import { useQuery } from "@tanstack/react-query";

export default function Navigation () {
    
    const user = useQuery({
        queryKey: ['user'],
        queryFn: api.getCurrentUser
    });



    return(
        <nav className="p-8 flex flex-col gap-6">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/1245px-Logo_of_Twitter.svg.png" className="w-12" alt="twitter-logo" />
            <Link href="/app" className="text-xl font-semibold hover:underline">Home</Link>
            <Link href={user.isSuccess ? "/app/profile/" + user.data.id :"/app" } className="text-xl font-semibold hover:underline">Profile</Link>
            <Link href="" className="text-xl font-semibold hover:underline">Notifications</Link>
            <button /* onClick={()=>signOut()} */  className="text-xl font-semibold text-left hover:underline">Sign Out</button>
            <Link href="/app" className="text-white rounded-full bg-[#60a5fa] p-2 text-center hover:bg-blue-600">New Tweet</Link>
        </nav>
    );
}