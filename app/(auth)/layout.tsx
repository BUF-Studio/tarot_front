import { AuthContextProvider } from "@/app/lib/context/AuthProvider";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
