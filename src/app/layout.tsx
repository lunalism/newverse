// src/app/layout.tsx

import type { Metadata } from "next";
import localFont from "next/font/local"; // next/font/local을 import 합니다.
import "./globals.css";

// 다운로드한 Pretendard 폰트를 불러옵니다.
const pretendard = localFont({
  src: "../../src/assets/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920", // 가변 폰트의 사용 범위
});

export const metadata: Metadata = {
  title: "newverse",
  description: "A news aggregator site built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      {/* pretendard.className을 body에 추가해 폰트를 전역으로 적용합니다. */}
      <body className={pretendard.className}>{children}</body>
    </html>
  );
}