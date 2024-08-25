import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { ToastModule } from "primeng/toast";
import { UsersService } from "../../services/users.service";

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
            detail: "Unable to update User",
          });
        }
      );
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
    private userService: UsersService
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
