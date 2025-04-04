import { blogPosts } from "../data";
import { BlogPostContent } from "./blog-post-content";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find(p => p.id === Number(params.id));

  if (!post) {
    return null;
  }

  return <BlogPostContent post={post} />;
}