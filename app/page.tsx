"use client";

import { SessionProvider } from "next-auth/react";
import Layout from "@/components/Layout";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
        <Layout>{children}</Layout>
    </SessionProvider>
  );
}
