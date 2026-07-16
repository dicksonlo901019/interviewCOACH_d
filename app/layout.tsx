import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "中國信託｜虛擬資產 PM 面試作戰室",
  description: "區塊鏈金融應用、穩定幣與法規變動面試準備手冊。",
  openGraph: {
    title: "虛擬資產 PM 面試作戰室",
    description: "區塊鏈金融應用、穩定幣與法規變動，一次掌握。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "虛擬資產 PM 面試作戰室",
    description: "區塊鏈金融應用、穩定幣與法規變動，一次掌握。",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
