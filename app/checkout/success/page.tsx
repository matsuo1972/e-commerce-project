"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/app/components/header";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      router.push("/");
    }
  }, [sessionId, router]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">ご注文ありがとうございます！</h1>
          <p className="text-muted-foreground mb-8">
            ご注文の確認メールをお送りしました。
            商品の発送準備が整い次第、発送のご連絡をさせていただきます。
          </p>
          <div className="space-y-4">
            <Button
              className="w-full"
              onClick={() => router.push("/orders")}
            >
              注文履歴を確認
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push("/products")}
            >
              ショッピングを続ける
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}