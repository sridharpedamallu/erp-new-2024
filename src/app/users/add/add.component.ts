import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { UsersService } from "../../services/users.service";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";

@Component({
  selector: "app-add",
  standalone: true,
  imports: [CardModule, ButtonModule, RouterModule, FormsModule, ToastModule],
  templateUrl: "./add.component.html",
  styleUrl: "./add.component.scss",
  providers: [MessageService],
})
export class AddComponent {
  tenantId: number = 0;
  name: string = "";
  email: string = "";
  phone: string = "";
  isActive: boolean = false;
  userType: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UsersService,
    private messageService: MessageService
  ) {
    this.activatedRoute.params.subscribe((e: any) => {
      this.tenantId = e.tenantId;
    });
  }

  insertUser() {
    this.userService
      .addUser(
        this.name,
        this.email,
        this.phone,
        this.tenantId,
        this.userType,
        this.isActive
      )
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
            detail: "Unable to create Tenant",
          });
        }
      );
  }
}
