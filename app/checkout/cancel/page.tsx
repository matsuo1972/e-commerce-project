"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/app/components/header";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

export default function CheckoutCancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="flex justify-center mb-6">
            <XCircle className="h-16 w-16 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">決済がキャンセルされました</h1>
          <p className="text-muted-foreground mb-8">
            決済処理が中断されました。
            もう一度お試しいただくか、別の決済方法をお試しください。
          </p>
          <div className="space-y-4">
            <Button
              className="w-full"
              onClick={() => router.back()}
            >
              カートに戻る
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