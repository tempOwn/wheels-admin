import DashboardLayout from "@/src/layouts/Dashboard";
import RouteGuard from "@/src/layouts/RouteGuard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RouteGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </RouteGuard>
  );
}
