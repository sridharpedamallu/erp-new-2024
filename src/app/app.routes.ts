import { Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";

export const routes: Routes = [
  {
    path: "customers",
    loadChildren: () =>
      import("./customers/customers.module").then((m) => m.CustomersModule),
    canActivate: [AuthGuard],
  },
  {
    path: "company-setup",
    loadChildren: () =>
      import("./company-setup/company-setup.module").then(
        (m) => m.CompanySetupModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "tenants",
    loadChildren: () =>
      import("./tenant/tenant.module").then((m) => m.TenantModule),
    canActivate: [AuthGuard],
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "**",
    loadChildren: () =>
      import("./customers/customers.module").then((m) => m.CustomersModule),
    canActivate: [AuthGuard],
  },
];
