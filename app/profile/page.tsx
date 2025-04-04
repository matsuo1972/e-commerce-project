"use client";

import { useEffect, useState } from "react";
import { Header } from "../components/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "sonner";

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  address: string | null;
}

interface Order {
  id: number;
  date: string;
  status: string;
  total: number;
  items: Array<{
    id: number;
    title: string;
    quantity: number;
    price: number;
  }>;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    address: "",
  });

  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profile) {
          setProfile(profile);
          setFormData({
            full_name: profile.full_name || "",
            phone: profile.phone || "",
            address: profile.address || "",
          });
        }
      }
    };

    fetchProfile();
  }, [supabase]);

  const handleUpdateProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          ...formData,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, ...formData } : null);
      setIsEditing(false);
      toast.success("プロフィールを更新しました");
    } catch (error) {
      toast.error("プロフィールの更新に失敗しました");
    }
  };

  // デモ用の注文データ
  useEffect(() => {
    setOrders([
      {
        id: 1,
        date: "2024-01-15",
        status: "配送済み",
        total: 8000,
        items: [
          { id: 1, title: "シンプルフレンチネイル", quantity: 1, price: 3800 },
          { id: 2, title: "パールグラデーション", quantity: 1, price: 4200 },
        ],
      },
      {
        id: 2,
        date: "2024-02-01",
        status: "処理中",
        total: 4800,
        items: [
          { id: 3, title: "フラワーアート", quantity: 1, price: 4800 },
        ],
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">マイページ</h1>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">プロフィール</TabsTrigger>
            <TabsTrigger value="orders">注文履歴</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>プロフィール情報</CardTitle>
                <CardDescription>
                  アカウント情報の確認と編集ができます
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">氏名</Label>
                      <Input
                        id="full_name"
                        value={formData.full_name}
                        onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">電話番号</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">住所</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleUpdateProfile}>保存</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        キャンセル
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">メールアドレス</p>
                        <p>{profile?.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">氏名</p>
                        <p>{profile?.full_name || "未設定"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">電話番号</p>
                        <p>{profile?.phone || "未設定"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">住所</p>
                        <p>{profile?.address || "未設定"}</p>
                      </div>
                    </div>
                    <Button onClick={() => setIsEditing(true)}>編集</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <div className="space-y-4">
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
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-sm text-muted-foreground">
                              数量: {item.quantity}
                            </p>
                          </div>
                          <p className="font-medium">
                            {new Intl.NumberFormat("ja-JP", {
                              style: "currency",
                              currency: "JPY",
                            }).format(item.price)}
                          </p>
                        </div>
                      ))}
                      <div className="pt-4 border-t">
                        <div className="flex justify-between items-center">
                          <p className="font-bold">合計</p>
                          <p className="font-bold">
                            {new Intl.NumberFormat("ja-JP", {
                              style: "currency",
                              currency: "JPY",
                            }).format(order.total)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}