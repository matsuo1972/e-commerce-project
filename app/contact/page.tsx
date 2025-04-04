"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Header } from "../components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, "お名前を入力してください"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  phone: z.string().optional(),
  subject: z.string().min(1, "お問い合わせ種別を選択してください"),
  message: z.string().min(10, "10文字以上入力してください"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [formData, setFormData] = useState<FormValues | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    setFormData(data);
    setIsConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (!formData) return;

    try {
      // ここで実際のAPIを呼び出してメール送信などを行う
      // デモ用に成功トーストを表示
      toast.success("お問い合わせを受け付けました");
      form.reset();
      setIsConfirmOpen(false);
    } catch (error) {
      toast.error("エラーが発生しました。もう一度お試しください。");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">お問い合わせ</h1>
          <p className="text-muted-foreground mb-8">
            ご質問やご要望がございましたら、以下のフォームよりお気軽にお問い合わせください。
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>お名前 <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="山田 花子" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>メールアドレス <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="example@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>電話番号</FormLabel>
                    <FormControl>
                      <Input placeholder="090-1234-5678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>お問い合わせ種別 <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="お問い合わせ種別を選択" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="product">商品について</SelectItem>
                        <SelectItem value="order">注文について</SelectItem>
                        <SelectItem value="shipping">配送について</SelectItem>
                        <SelectItem value="return">返品・交換について</SelectItem>
                        <SelectItem value="other">その他</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>お問い合わせ内容 <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="お問い合わせ内容を入力してください"
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                確認画面へ
              </Button>
            </form>
          </Form>

          <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>お問い合わせ内容の確認</DialogTitle>
                <DialogDescription>
                  以下の内容でお問い合わせを送信します。
                </DialogDescription>
              </DialogHeader>
              {formData && (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">お名前</p>
                    <p className="text-sm text-muted-foreground">{formData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">メールアドレス</p>
                    <p className="text-sm text-muted-foreground">{formData.email}</p>
                  </div>
                  {formData.phone && (
                    <div>
                      <p className="text-sm font-medium">電話番号</p>
                      <p className="text-sm text-muted-foreground">{formData.phone}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium">お問い合わせ種別</p>
                    <p className="text-sm text-muted-foreground">{formData.subject}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">お問い合わせ内容</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {formData.message}
                    </p>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
                  修正する
                </Button>
                <Button onClick={handleConfirm}>送信する</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
}