"use client";

import { useEffect, useState } from "react";
import { Header } from "../components/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { formatPrice } from "../utils";

interface OrderItem {
  id: number;
  title: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: number;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  // デモ用の注文データ
  useEffect(() => {
    setOrders([
      {
        id: 1,
        date: "2024-01-15",
        status: "配送済み",
        total: 8000,
        items: [
          {
            id: 1,
            title: "シンプルフレンチネイル",
            quantity: 1,
            price: 3800,
            image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&q=80"
          },
          {
            id: 2,
            title: "パールグラデーション",
            quantity: 1,
            price: 4200,
            image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=500&q=80"
          },
        ],
      },
      {
        id: 2,
        date: "2024-02-01",
        status: "処理中",
        total: 4800,
        items: [
          {
            id: 3,
            title: "フラワーアート",
            quantity: 1,
            price: 4800,
            image: "https://images.unsplash.com/photo-1604902396830-aca29e19b067?w=500&q=80"
          },
        ],
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">注文履歴</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>注文番号: {order.id}</CardTitle>
                    <CardDescription>注文日: {order.date}</CardDescription>
                  </div>
                  <Badge variant={order.status === "配送済み" ? "default" : "secondary"}>
                    {order.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <Link href={`/product/${item.id}`} className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                      <div className="flex-grow flex justify-between items-center">
                        <div>
                          <Link href={`/product/${item.id}`}>
                            <h3 className="font-medium hover:underline">{item.title}</h3>
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            数量: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatPrice(item.price)}</p>
                          <Link href={`/product/${item.id}`}>
                            <Button variant="ghost" size="sm" className="mt-2">
                              再度購入 <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <p className="font-bold">合計</p>
                      <p className="font-bold">{formatPrice(order.total)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}