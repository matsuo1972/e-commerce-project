"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, ArrowLeft, Minus, Plus } from "lucide-react";
import { Header } from "@/app/components/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CartSheet } from "@/app/components/cart-sheet";
import { Product, CartItem } from "@/app/types";
import { formatPrice } from "@/app/utils";
import { toast } from "sonner";

interface ProductContentProps {
  product: Product;
}

export function ProductContent({ product }: ProductContentProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);

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

  const addToCart = () => {
    if (!product) return;

    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...currentCart, { ...product, quantity }];
    });
    
    toast.success("カートに追加しました");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/products")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            商品一覧に戻る
          </Button>
          <CartSheet
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <Badge className="mb-2">{product.category}</Badge>
            <h1 className="text-4xl font-bold">{product.title}</h1>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-lg">{product.rating}</span>
              </div>
            </div>
            
            <p className="text-3xl font-bold">{formatPrice(product.price)}</p>
            
            <p className="text-gray-600 text-lg">{product.description}</p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-8 w-8"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-8 w-8"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                className="flex-1"
                onClick={addToCart}
              >
                カートに追加
              </Button>
            </div>

            <div className="border rounded-lg p-4 space-y-4">
              <h2 className="font-semibold">商品の特徴</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>プロのネイリストによる丁寧な手作り</li>
                <li>高品質な材料を使用</li>
                <li>装着が簡単で長持ち</li>
                <li>豊富なサイズ展開</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}