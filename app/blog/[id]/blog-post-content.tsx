"use client";

import { useRouter } from "next/navigation";
import { Header } from "../../components/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { formatDate } from "../../utils";
import Link from "next/link";
import { BlogPost } from "@/app/types";
import { blogPosts } from "../data";

interface BlogPostContentProps {
  post: BlogPost;
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  const router = useRouter();

  // 関連記事を取得（同じカテゴリーの他の記事）
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 2);

  // 目次を生成
  const tableOfContents = post.content
    .split('\n\n')
    .filter(paragraph => paragraph.trim().startsWith('1.'))
    .map(section => section.split('\n').map(line => line.trim()));

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = post.title;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => router.push("/blog")}
          className="mb-8 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          ブログ一覧に戻る
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* メイン記事 */}
          <article className="lg:col-span-3">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge>{post.category}</Badge>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.publishedAt)}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  {post.author}
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
              
              {/* SNSシェアボタン */}
              <div className="flex items-center gap-4 mb-6">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Share2 className="h-4 w-4" />
                  シェア
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare('twitter')}
                  className="text-[#1DA1F2]"
                >
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare('facebook')}
                  className="text-[#4267B2]"
                >
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare('linkedin')}
                  className="text-[#0A66C2]"
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="prose prose-lg max-w-none">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          {/* サイドバー */}
          <div className="space-y-6">
            {/* 目次 */}
            {tableOfContents.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>目次</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tableOfContents[0].map((item, index) => (
                      <li key={index} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* 関連記事 */}
            {relatedPosts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>関連記事</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {relatedPosts.map(relatedPost => (
                      <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                        <div className="group space-y-2">
                          <div className="aspect-video rounded-lg overflow-hidden">
                            <img
                              src={relatedPost.image}
                              alt={relatedPost.title}
                              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <h3 className="font-medium group-hover:text-primary transition-colors">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(relatedPost.publishedAt)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}