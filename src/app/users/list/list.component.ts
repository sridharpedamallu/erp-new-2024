import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { UsersService } from "../../services/users.service";
import { MessageService, ConfirmationService } from "primeng/api";
import { UserTypes } from "../../enums";

@Component({
  selector: "app-list",
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RouterModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  templateUrl: "./list.component.html",
  styleUrl: "./list.component.scss",
  providers: [MessageService, ConfirmationService],
})
export class ListComponent implements OnInit {
  tenantId: number = 0;
  userList: any[] = [];

  userTypes = UserTypes;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.activatedRoute.params.subscribe((e: any) => {
      this.tenantId = e.tenantId;
    });
  }
  ngOnInit(): void {
    this.loadList();
  }

  loadList() {
    this.userService.getAllUsers(this.tenantId).subscribe((data: any) => {
      this.userList = [...data];
    });
  }

  deleteUser(userId: number) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete?",
      header: "Confirmation",
      icon: "pi pi-info-circle",
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.userService.deleteUser(userId).subscribe({
          next: (data: any) => {
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "User deleted successfully",
            });
            this.loadList();
          },
          error: (e: any) => {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Unable to delete User",
            });
          },
        });
      },
    });
  }
}
