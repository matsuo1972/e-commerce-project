import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans_JP, Dancing_Script } from 'next/font/google';
import { Toaster } from "@/components/ui/sonner";
import { Footer } from './components/footer';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dancing-script',
});

export const metadata: Metadata = {
  title: 'Marino Atelier - プレミアムネイルチップの通販サイト',
  description: 'プロのネイリストが作成した高品質なネイルチップをお届けします。あなたの爪に合わせたサイズ選択が可能です。',
  openGraph: {
    title: 'Marino Atelier - プレミアムネイルチップの通販サイト',
    description: 'プロのネイリストが作成した高品質なネイルチップをお届けします。',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`scroll-smooth ${notoSansJP.variable} ${dancingScript.variable}`}>
      <body className="flex min-h-screen flex-col font-noto">
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}