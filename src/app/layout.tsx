// src/app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todo App",
  description: "Mini projet Next.js + MongoDB + Prisma",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, background: "#fafafa" }}>{children}</body>
    </html>
  );
}
