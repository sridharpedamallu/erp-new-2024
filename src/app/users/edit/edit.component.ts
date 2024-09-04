import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { ToastModule } from "primeng/toast";
import { UsersService } from "../../services/users.service";
import { TenantsService } from "../../services/tenants.service";

@Component({
  selector: "app-edit",
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ToastModule,
  ],
  templateUrl: "./edit.component.html",
  styleUrl: "./edit.component.scss",
  providers: [MessageService],
})
export class EditComponent {
  editUser() {
    let updateUserflg: boolean = false;
    this.tenantService
      .getTenantLoginSetupData(this.tenantId)
      .subscribe((data: any) => {
        if (data.loginSettings.domainRestricted) {
          let tempDomainName = this.email.split("@")[1];
          if (data.domains.length == 0) {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Login domains not setup",
            });
          } else {
            if (data.domains.findIndex((d: any) => d == tempDomainName) == -1) {
              this.messageService.add({
                severity: "error",
                summary: "Error",
                detail: "Email is not in the allowed domains list",
              });
            } else {
              updateUserflg = true;
            }
          }
        } else {
          updateUserflg = true;
        }
        if (updateUserflg) {
          this.userService
            .editUser(
              this.userId,
              this.name,
              this.email,
              this.phone,
              this.userType,
              this.isActive
            )
            .subscribe(
              (data: any) => {
                this.messageService.add({
                  severity: "success",
                  summary: "Success",
                  detail: "User details updated successfully",
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
      });
  }

  tenantId: number = 0;
  userId: number = 0;
  name: string = "";
  isActive: boolean = false;
  email: string = "";
  phone: string = "";
  userType: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private userService: UsersService,
    private tenantService: TenantsService
  ) {
    this.activatedRoute.params.subscribe((e: any) => {
      this.tenantId = e.tenantId;
      this.userId = e.id;
      this.userService.getUserById(this.userId).subscribe((data: any) => {
        this.name = data.name;
        this.email = data.email;
        this.isActive = data.isActive;
        this.phone = data.phone;
      });
    });
  }
}
