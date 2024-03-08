"use client";

import { useQuery,useMutation } from "@tanstack/react-query";
import api from "@/app/lib/axios";
import { redirect,useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Post from "@/components/Post";

export default function PostPage () {

    const params = useParams();

    const post = useQuery({
       queryKey:["post", params.postId],
       queryFn: ()=>api.getPost(params.postId as string)
    });

    return(
        <>
            {post.isSuccess ?(
                <Post post={post.data}/>
            ):null}
        </>
    )
}
