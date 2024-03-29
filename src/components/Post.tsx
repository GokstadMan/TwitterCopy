import { useMutation, useQueryClient,  } from "@tanstack/react-query";
import { useCopyToClipboard } from "usehooks-ts";
import Link from "next/link";
import api from "@/app/lib/axios";

export default function Post({ post }) {

    const queryClient = useQueryClient();
    const [value,copy] = useCopyToClipboard();

    const likePost = useMutation({
        mutationFn: ()=> api.likePost(post.id as string),
        onSuccess: ()=>queryClient.invalidateQueries()
    });

    return(
        <p>
            <div className="flex flex-col gap-2 border-b-2 border-gray-300">
                  <div className="flex gap-2 p-4">
                    <img src={post.user.image} className="w-14 h-14 rounded-full" />
                    <div className="flex flex-col">
                      <Link href={"/app/profile/" + post.userId} className="text-lg font-semibold">{post.user.name}</Link>
                      <h4 className="text-sm text-gray-600">{post.user.email}</h4>
                    </div>
                  </div>
                  <p className="px-4">
                    {post.content}
                  </p>
                  <div className="flex justify-between text-center items-center px-4 mt-4">
                    <Link href ={"/app/post/"+ post.id} className="w-full p-2 border-t-2 border-gray-300">
                        {post.replies.length} Reply/ies
                    </Link>
                    <button 
                        onClick={()=> likePost.mutate()} 
                        className={post.requesterHasLiked ?"text-blue-500 font-semibold w-full p-2 border-t-2 border-x-2 border-gray-300": "w-full p-2 border-t-2 border-x-2 border-gray-300"}>
                       {post.likes.length} Like/s
                    </button>
                    <button onClick={()=>copy(process.env.NEXT_PUBLIC_BASE_URL + "/app/post/" + post.id)} className="w-full p-2 border-t-2 border-gray-300">
                        {value ? "Copied to clickboard!" : "Share"}
                    </button>
                  </div>
                </div>
        </p>
    )
}