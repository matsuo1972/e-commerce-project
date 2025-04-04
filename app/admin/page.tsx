"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Header } from "../components/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Order, Product } from "../types";
import { formatPrice } from "../utils";

export default function AdminPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminStatus();
    fetchOrders();
    fetchProducts();
  }, []);

  const checkAdminStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/auth");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      router.push("/");
      return;
    }

    setIsAdmin(true);
    setIsLoading(false);
  };

  const fetchOrders = async () => {
    const { data: orders, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("注文データの取得に失敗しました");
      return;
    }

    setOrders(orders);
  };

  const fetchProducts = async () => {
    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .order("id");

    if (error) {
      toast.error("商品データの取得に失敗しました");
      return;
    }

    setProducts(products);
  };

  const updateOrderStatus = async (orderId: string, status: Order["status"]) => {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId);

    if (error) {
      toast.error("ステータスの更新に失敗しました");
      return;
    }

    toast.success("ステータスを更新しました");
    fetchOrders();
  };

  const updateTrackingNumber = async (orderId: string, trackingNumber: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ tracking_number: trackingNumber })
      .eq("id", orderId);

    if (error) {
      toast.error("追跡番号の更新に失敗しました");
      return;
    }

    toast.success("追跡番号を更新しました");
    fetchOrders();
  };

  const updateStock = async (productId: number, stock: number) => {
    const { error } = await supabase
      .from("products")
      .update({ stock })
      .eq("id", productId);

    if (error) {
      toast.error("在庫数の更新に失敗しました");
      return;
    }

    toast.success("在庫数を更新しました");
    fetchProducts();
  };

  if (isLoading || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">管理者ダッシュボード</h1>

        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList>
            <TabsTrigger value="orders">注文管理</TabsTrigger>
            <TabsTrigger value="inventory">在庫管理</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>注文一覧</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>注文ID</TableHead>
                        <TableHead>注文日</TableHead>
                        <TableHead>合計金額</TableHead>
                        <TableHead>ステータス</TableHead>
                        <TableHead>追跡番号</TableHead>
                        <TableHead>アクション</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>{order.id}</TableCell>
                          <TableCell>
                            {new Date(order.createdAt).toLocaleDateString("ja-JP")}
                          </TableCell>
                          <TableCell>{formatPrice(order.total)}</TableCell>
                          <TableCell>
                            <Select
                              defaultValue={order.status}
                              onValueChange={(value) => 
                                updateOrderStatus(order.id, value as Order["status"])
                              }
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">未処理</SelectItem>
                                <SelectItem value="processing">処理中</SelectItem>
                                <SelectItem value="shipped">発送済み</SelectItem>
                                <SelectItem value="delivered">配達済み</SelectItem>
                                <SelectItem value="cancelled">キャンセル</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Input
                              placeholder="追跡番号を入力"
                              value={order.trackingNumber || ""}
                              onChange={(e) => 
                                updateTrackingNumber(order.id, e.target.value)
                              }
                              className="w-40"
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => router.push(`/admin/orders/${order.id}`)}
                            >
                              詳細
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle>在庫管理</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>商品ID</TableHead>
                        <TableHead>商品名</TableHead>
                        <TableHead>カテゴリー</TableHead>
                        <TableHead>価格</TableHead>
                        <TableHead>在庫数</TableHead>
                        <TableHead>アクション</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>{product.id}</TableCell>
                          <TableCell>{product.title}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{formatPrice(product.price)}</TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={product.stock}
                              onChange={(e) => 
                                updateStock(product.id, parseInt(e.target.value))
                              }
                              className="w-24"
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => router.push(`/admin/products/${product.id}`)}
                            >
                              編集
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}