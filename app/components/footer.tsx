"use client";

import Link from "next/link";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 会社情報 */}
          <div>
            <h3 className="font-bold text-lg mb-4">Marino Atelier</h3>
            <p className="text-sm text-muted-foreground mb-4">
              プロのネイリストによる高品質なネイルチップの制作・販売
            </p>
            <div className="flex space-x-4">
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
            </div>
          </div>

          {/* 商品情報 */}
          <div>
            <h3 className="font-bold mb-4">商品について</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                  商品一覧
                </Link>
              </li>
              <li>
                <Link href="/products?category=ベーシック" className="text-muted-foreground hover:text-foreground transition-colors">
                  定番デザイン
                </Link>
              </li>
              <li>
                <Link href="/products?category=トレンド" className="text-muted-foreground hover:text-foreground transition-colors">
                  トレンド
                </Link>
              </li>
              <li>
                <Link href="/products?category=ブライダル" className="text-muted-foreground hover:text-foreground transition-colors">
                  ブライダル
                </Link>
              </li>
            </ul>
          </div>

          {/* 会社案内 */}
          <div>
            <h3 className="font-bold mb-4">会社案内</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  会社概要
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  ブログ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                  採用情報
                </Link>
              </li>
            </ul>
          </div>

          {/* カスタマーサポート */}
          <div>
            <h3 className="font-bold mb-4">カスタマーサポート</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  よくある質問
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">
                  配送について
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-foreground transition-colors">
                  返品・交換について
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  利用規約
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Marino Atelier All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}