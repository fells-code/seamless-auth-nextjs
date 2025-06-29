"use client";

import { AuthProvider } from "./hooks/AuthProvider";

export function SeamlessAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
