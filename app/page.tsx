"use client";

import { Header } from "./components/header";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { demoProducts } from "./utils";

export default function Home() {
  const newDesigns = demoProducts.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* ヒーローセクション */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80"
            alt="ネイルアート"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-dancing mb-6"
          >
            あなたらしさを、指先から
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          >
            プロのネイリストが作る、高品質なネイルチップ。
            あなたの爪に合わせたサイズで、理想の指先を演出します。
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button size="lg" className="bg-primary text-primary-foreground">
              デザインを見る
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 新作デザインセクション */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-center mb-12">
            <div>
              <Badge className="mb-2">New Arrival</Badge>
              <h2 className="text-3xl font-dancing">ネイリスト厳選の新作デザイン</h2>
            </div>
            <Link href="/products">
              <Button variant="ghost" className="flex items-center gap-2">
                すべてのデザインを見る
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {newDesigns.map((design, index) => (
              <motion.div
                key={design.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Link href={`/product/${design.id}`}>
                  <div className="group relative aspect-square rounded-lg overflow-hidden mb-4">
                    <img
                      src={design.image}
                      alt={design.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <Badge className="mb-2">{design.category}</Badge>
                  <h3 className="text-xl font-semibold mb-2">{design.title}</h3>
                  <p className="text-lg font-bold text-primary">{new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(design.price)}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-dancing text-center mb-12">
            Marino Atelierの特徴
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-background p-6 rounded-lg shadow-lg"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: "💅",
    title: "プロの技術",
    description: "熟練ネイリストによる丁寧な手作業で、細部までこだわった美しいデザイン",
  },
  {
    icon: "📏",
    title: "ぴったりサイズ",
    description: "10サイズから選べる豊富なサイズ展開で、自然な装着感を実現",
  },
  {
    icon: "🎨",
    title: "トレンド対応",
    description: "最新のトレンドを取り入れた、季節に合わせた旬なデザイン",
  },
];