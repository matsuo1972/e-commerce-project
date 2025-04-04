"use client";

import { Header } from "../components/header";
import { ProductCard } from "../components/product-card";
import { CartSheet } from "../components/cart-sheet";
import { useState } from "react";
import { CartItem } from "../types";
import { demoProducts } from "../utils";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function ProductsPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || "all");

  const filteredProducts = selectedCategory === "all" 
    ? demoProducts 
    : demoProducts.filter(product => product.category === selectedCategory);

  const categories = ["all", ...new Set(demoProducts.map(product => product.category))];

  const addToCart = (product: Product) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...currentCart, { ...product, quantity: 1 }];
    });
    
    toast.success("カートに追加しました");
  };

  const updateQuantity = (productId: number, change: number) => {
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: number) => {
    setCart(currentCart => currentCart.filter(item => item.id !== productId));
    toast.success("商品を削除しました");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-dancing mb-4">ネイルデザインコレクション</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            プロのネイリストが手がける、トレンドを取り入れた最新のデザインから
            定番の人気デザインまで、幅広いコレクションをご用意しています。
          </p>
        </div>

        <div className="flex flex-nowrap justify-start md:justify-center gap-2 mb-12 overflow-x-auto pb-4 px-2 -mx-2 scrollbar-none">
          <div className="flex gap-2 min-w-max px-2">
            {categories.map(category => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                  ${selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                whileHover={{ scale: selectedCategory === category ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {category === "all" ? "すべて" : category}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard
                product={product}
                onAddToCart={addToCart}
              />
            </motion.div>
          ))}
        </div>

        <div className="fixed bottom-4 right-4">
          <CartSheet
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        </div>
      </main>
    </div>
  );
}