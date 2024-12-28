import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

async function fetchUserPosts() {
  const { userId }: any = await auth();
  if (!userId) {
    return null;
  }
  const posts = await db.post.findMany({
    where: {
      author: {
        clerkId: userId,
      },
    },
    select: {
      id: true,
      title: true,
      content: true,
      bannerImg: true,
      createdAt: true,
      premium: true,
      author: {
        select: {
          id: true,
          username: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });
  return posts.length ? posts : null;
}

const Page = async () => {
  const posts = await fetchUserPosts();
  return (
    <div>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
};

export default Page;
