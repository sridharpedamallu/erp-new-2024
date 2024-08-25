import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { UsersService } from "../../services/users.service";
import { MessageService, ConfirmationService } from "primeng/api";

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UsersService
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

  deleteUser(userId: number) {}
}
