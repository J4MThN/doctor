import { Role } from "@/src/core";
import AdminLayout from "@/src/modules/Admin/layout/AdminLayout";

import { ProtectedLayout } from "@/src/shared/auth/ProtectedLayout";
import { RoleGuard } from "@/src/shared/auth/RoleGuard";
 

export default function AdminRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedLayout>
      <RoleGuard allowedRoles={[Role.ADMIN]}>
        <div className="flex flex-col  min-h-screen w-full">
          <AdminLayout />

          <main className="flex min-w-0 flex-1">
            {children}
          </main>
        </div>
      </RoleGuard>
    </ProtectedLayout>
  );
}