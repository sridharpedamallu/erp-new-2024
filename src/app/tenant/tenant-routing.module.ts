import { Routes, RouterModule, Route } from "@angular/router";
import { NgModule } from "@angular/core";
import { EditComponent } from "./edit/edit.component";
import { AddComponent } from "./add/add.component";
import { ListComponent } from "./list/list.component";

const routes: Routes = [
  {
    path: "add",
    component: AddComponent,
  },
  {
    path: "clone/:id",
    component: AddComponent,
  },
  {
    path: "edit/:id",
    component: EditComponent,
  },
  {
    path: "**",
    component: ListComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TenantRoutingModule {}
