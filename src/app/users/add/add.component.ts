import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { UsersService } from "../../services/users.service";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { TenantsService } from "../../services/tenants.service";
import { DropdownModule } from "primeng/dropdown";

@Component({
  selector: "app-add",
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    RouterModule,
    FormsModule,
    ToastModule,
    DropdownModule,
  ],
  templateUrl: "./add.component.html",
  styleUrl: "./add.component.scss",
  providers: [MessageService],
})
export class AddComponent {
  tenantId: number = 0;
  cloneUser: number = 0;
  name: string = "";
  email: string = "";
  phone: string = "";
  isActive: boolean = false;
  userType: number = 1;

  userTypes: any[] = [
    { id: 1, type: "User" },
    { id: 2, type: "Contributor" },
    { id: 9, type: "Admin" },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UsersService,
    private tenantService: TenantsService,
    private messageService: MessageService
  ) {
    this.activatedRoute.params.subscribe((e: any) => {
      this.tenantId = e.tenantId;
      this.cloneUser = e?.id;
      if (this.cloneUser) {
        this.userService.getUserById(this.cloneUser).subscribe((data: any) => {
          this.name = data.name;
          this.email = data.email;
          this.phone = data.phone;
          this.isActive = data.isActive;
          this.userType = data.userType;
        });
      }
    });
  }

  insertUser() {
    let insertUserflg: boolean = false;
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
              insertUserflg = true;
            }
          }
        } else {
          insertUserflg = true;
        }
        if (insertUserflg) {
          this.userService
            .addUser(
              this.name,
              this.email,
              this.phone,
              +this.tenantId,
              this.userType,
              this.isActive
            )
            .subscribe(
              (data: any) => {
                this.messageService.add({
                  severity: "success",
                  summary: "Success",
                  detail: "User created successfully",
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
}
