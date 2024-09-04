import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { TenantsService } from "../../services/tenants.service";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { TabViewModule } from "primeng/tabview";
import { LoginSetupComponent } from "../login-setup/login-setup.component";

@Component({
  selector: "app-edit",
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ToastModule,
    TabViewModule,
    LoginSetupComponent,
  ],
  templateUrl: "./edit.component.html",
  styleUrl: "./edit.component.scss",
  providers: [MessageService],
})
export class EditComponent {
  id: number = 0;
  name: string = "";
  email: string = "";
  phone: string = "";
  isActive: boolean = false;

  constructor(
    private tenantsService: TenantsService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((e: any) => {
      this.id = e.id;
      this.loadTenant();
    });
  }
  loadTenant() {
    if (this.id != undefined) {
      this.tenantsService.getAllTenantById(this.id).subscribe((data: any) => {
        this.name = data.name;
        this.email = data.email;
        this.phone = data.phone;
        this.isActive = data.isActive;
      });
    }
  }
  editTenant() {
    this.tenantsService
      .editTenant(this.id, this.name, this.email, this.phone, this.isActive)
      .subscribe(
        (data: any) => {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Tenant updated successfully",
          });
        },
        (error) => (error: any) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.message,
          });
        }
      );
  }
}
