import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();

  // 管理者認証ページのパス
  if (req.nextUrl.pathname === "/admin-auth") {
    if (session) {
      // セッションがある場合は管理者権限を確認
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (profile?.role === "admin") {
        // 管理者はすでにログインしているので管理画面にリダイレクト
        return NextResponse.redirect(new URL("/admin", req.url));
      }
    }
    // セッションがないか管理者でない場合は認証ページを表示
    return res;
  }

  // 管理者ページへのアクセス制御
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!session) {
      // 未ログインの場合は管理者認証ページへリダイレクト
      return NextResponse.redirect(new URL("/admin-auth", req.url));
    }

    // 管理者権限の確認
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (profile?.role !== "admin") {
      // 管理者でない場合はホームページにリダイレクト
      return NextResponse.redirect(new URL("/", req.url));
    }

    return res;
  }

  // 一般ユーザー向けの認証制御
  if (!session && req.nextUrl.pathname !== "/auth") {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (session && req.nextUrl.pathname === "/auth") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};