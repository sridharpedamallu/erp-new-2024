import { Routes, RouterModule, Route } from "@angular/router";
import { NgModule } from "@angular/core";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { AddCustomerComponent } from "./add-customer/add-customer.component";

const routes: Routes = [
  {
    path: "list",
    component: CustomerListComponent,
  },
  {
    path: "add",
    component: AddCustomerComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
