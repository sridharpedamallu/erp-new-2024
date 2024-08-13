import { Routes, RouterModule, Route } from "@angular/router";
import { NgModule } from "@angular/core";
import { CompanyListComponent } from "./company-list/company-list.component";
import { AddCompanyComponent } from "./add-company/add-company.component";
const routes: Routes = [
  {
    path: "list",
    component: CompanyListComponent,
  },
  {
    path: "add",
    component: AddCompanyComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanySetupRoutingModule {}
