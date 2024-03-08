"use client";

import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/app/lib/axios";
import { useState } from "react";
import Post from "@/components/Post";

export default function App() {

  const { data:session} = useSession();
  const [postData,setPostData] = useState("");

  const queryClient = useQueryClient();

  const posts = useQuery({
    queryKey:["posts"],
    queryFn:api.getPosts
  });

  const createPost = useMutation({
    mutationFn: ()=>api.createPost({content:postData}),
    onSuccess: ()=>queryClient.invalidateQueries()
  });

    return (
      <>
        <div className="flex justify-between gap-2 p-4 items-center border-b-2 border-gray-300">
          <div>
            <img src={session?.user?.image ?? ""} className="w-12 rounded-full" />
          </div>
          <input value={postData} onChange={(e)=>setPostData(e.target.value)} placeholder="What's happening?" />
          <div>
            <button onClick={()=>createPost.mutate()} className="bg-[#60a5fa] px-4 py-2 text-white rounded-full hover:bg-blue-500">Tweet</button>
          </div>
        </div>
        <div className="flex flex-col">
          {posts.isSuccess ? (
            <>
              {posts.data.map((post: any,index: any)=>(
                <Post post={post} key={index}/>
              ))};
            </>
          ):null}
        </div>
      </>
    )
}
