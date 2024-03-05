"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/app/lib/axios";
import { useParams,redirect } from "next/navigation";
import { useSession } from "next-auth/react";


export default function Profile() {

    const {data:session} = useSession();

    const params = useParams();

    const user = useQuery({
        queryKey:["user", params.userId],
        queryFn:()=>api.getUser(params.userId as string)
    });

    if(user.isError) {
        return redirect("/app");
    }


    return(
        <>
            {user.isLoading ? <p>Is loading.....</p> :null}
            {user.isSuccess ? (
                <div className="flex justify-between p-6 border-b-2 border-gray-300">
                    <div className="flex items-center gap-4">
                        <img src={user.data.image} className="w-24 rounded-full" alt="userPic" />
                        <div className="flex flex-col gap-2">
                            <h2 className="text-xl font-semibold">{user.data.name}</h2>
                            <h4>{user.data.email}</h4>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-center">
                            <h3 className="font-semibold">100</h3>
                            <h4>Followers</h4>
                        </div>
                        <div className="text-center">
                            <h3 className="font-semibold">37</h3>
                            <h4>Following</h4>
                        </div>
                        {user.data.email === session?.user?.email ? (
                            <button className="bg-[#60a5fa] p-2 text-white rounded-full hover:bg-blue-500">Edit Profile</button>
                        ):(
                            <button className="bg-[#60a5fa] p-2 text-white rounded-full hover:bg-blue-500">Follow</button>
                        )}
                    </div>
                </div>
            ) :null}
        </>
    )
}