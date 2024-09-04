import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AddComponent } from "./add/add.component";
import { EditComponent } from "./edit/edit.component";
import { ListComponent } from "./list/list.component";
import { PageNotFoundComponent } from "../common/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: "add/tenant/:tenantId",
    component: AddComponent,
  },
  {
    path: "edit/tenant/:tenantId/:id",
    component: EditComponent,
  },
  {
    path: "clone/tenant/:tenantId/:id",
    component: AddComponent,
  },
  {
    path: "list/tenant/:tenantId",
    component: ListComponent,
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
