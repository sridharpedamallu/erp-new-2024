import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { TenantsService } from "../../services/tenants.service";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-add",
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    RouterModule,
    CardModule,
    FormsModule,
    ToastModule,
  ],
  templateUrl: "./add.component.html",
  styleUrl: "./add.component.scss",
  providers: [MessageService],
})
export class AddComponent {
  name: string = "";
  email: string = "";
  phone: string = "";
  isActive: boolean = false;
  cloneId: number = 0;

  constructor(
    private tenantService: TenantsService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((e: any) => {
      this.cloneId = e?.id;
      if (this.cloneId) {
        this.tenantService
          .getAllTenantById(this.cloneId)
          .subscribe((data: any) => {
            this.name = data.name;
            this.email = data.email;
            this.phone = data.phone;
            this.isActive = data.isActive;
          });
      }
    });
  }

  insertTenant() {
    this.tenantService
      .addTenant(this.name, this.email, this.phone, this.isActive)
      .subscribe(
        (data: any) => {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Tenant created successfully",
          });
        },
        (e: any) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: e.error.message,
          });
        }
      );
  }
}
