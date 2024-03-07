export default function Post({ post }) {
    return(
        <p>
            <div className="flex flex-col gap-2 p-4 border-b-2 border-gray-300">
                  <div className="flex gap-2">
                    <img src={post.user.image} className="w-14 h-14 rounded-full" />
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold">{post.user.name}</h3>
                      <h4 className="text-sm text-gray-600">{post.user.email}</h4>
                    </div>
                  </div>
                  <p className="py-4">
                    {post.content}
                  </p>
                  <div className="flex justify-between items-center px-4">
                    <p>Reply</p>
                    <p>Like</p>
                    <p>Share</p>
                  </div>
                </div>
        </p>
    )
}