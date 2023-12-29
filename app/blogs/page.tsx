import { Post } from "@/core/model/posts.model";
import Image from "next/image";
import Blogs from "../_componment/blogs";

export const dynamic = "force-dynamic";

async function getServerSideProps(context: any) {
  const id = context.params?.id;
  const response = await fetch("https://dummyjson.com/posts");
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
}

async function fetchBlogs() {
  const response = await fetch("https://dummyjson.com/posts?limit=10", {
    // cache: "force-cache", ///< SSG getStaticSideProps
    cache: "no-store", ///< SSR getServerSideProps
    // next: {
    //   revalidate: 20, ///< ISR revalidate
    // },
  });

  // await wait(4000);
  console.log("fetching Products");
  const data = await response.json();
  return data;
}

export default async function Home() {
  const blogs = await fetchBlogs();
  console.log(blogs);
  return (
    <div className="p-10">
      <Blogs data={blogs} />
    </div>
  );
}
